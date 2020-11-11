type ValueOf<T> = T[keyof T]

const operatorFuncs = {
    "==": (a: any, b: any) => a == b,
    ">=": (a: number, b: number) => a>= b,
    "<=": (a: number, b: number) => a<= b,
}

type OperatorNames = keyof typeof operatorFuncs

type OperatorOutput<N extends OperatorNames> = ReturnType<typeof operatorFuncs[N]>

type OperatorInfos = { 
    [K in keyof typeof operatorFuncs]: {
        output: OperatorOutput<K>,
        name: K,
    }
}

type OperatorNamesByOutputType<O> = Extract<
    ValueOf<OperatorInfos>, 
    { output: O }
> ["name"]

type OperatorInputFromFunc<F extends (...args: any) => any> = 
    F extends () => any ? undefined :
    F extends (input: infer I) => any ? I | Operator<I> :
    {
        [K in Exclude<keyof Parameters<F>, keyof any[]>]: Parameters<F>[K] | Operator<Parameters<F>[K]>
    }

type OperatorInputFromName<N extends OperatorNames> = OperatorInputFromFunc<typeof operatorFuncs[N]>

type Operator<O> = {
    /* 
        Single-key object type
        https://stackoverflow.com/a/57576688
        ```
        type OneKey<K extends string, V = any> = {
        [P in K]: (Record<P, V> &
            Partial<Record<Exclude<K, P>, never>>) extends infer O
            ? { [Q in keyof O]: O[Q] }
            : never
        }[K]
        ```
    */
    [P in OperatorNamesByOutputType<O>]: ({ [A in P]: OperatorInputFromName<P> } &
        Partial<{ [B in Exclude<OperatorNamesByOutputType<O>, P>]: never }>) extends infer O
        ? { [Q in keyof O]: O[Q] }
        : never
}[OperatorNamesByOutputType<O>]

export interface Ability {
    if: Operator<boolean>[],
    then: Operator<any>[],
}
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
    Parameters<F>

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
    [P in OperatorNamesByOutputType<O>]: (Record<P, OperatorInputFromFunc<typeof operatorFuncs[P]>> &
        Partial<Record<Exclude<OperatorNamesByOutputType<O>, P>, never>>) extends infer O
        ? { [Q in keyof O]: O[Q] }
        : never
}[OperatorNamesByOutputType<O>]

interface Ability {
    if: Operator<boolean>[]
}

const justice: Ability = {
    if: [
        { "==": [ { votes: { team: "mafia" } }, 0 ] },
        { "==": [ { votes: { role: "cultReader" } }, 0 ] },
        { ">=": [ { votes: { team: "citizenTeam" } }, { votes: { team: "cultTeam" } } ] }
    ]
}
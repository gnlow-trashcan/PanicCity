type ValueOf<T> = T[keyof T]

const operatorFuncs = {
    "==": (a: any, b: any) => a == b,
    "test": () => 0,
    "test2": () => true
}

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
> extends {name: infer N} ? N: never

type OperatorNames = keyof typeof operatorFuncs

type Operator<
    N extends OperatorNames = OperatorNames
> = {[K in N]: Parameters<typeof operatorFuncs[K]>}

interface Ability {
    if: Operator<OperatorNamesByOutputType<boolean>>
}
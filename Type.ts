type ValueOf<T> = T[keyof T]

const operatorFuncs = {
    "==": (a: any, b: any) => a == b,
    "test": () => 0,
    "test2": () => true
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

type Operator<O> = {
    [N in OperatorNamesByOutputType<O>]: Parameters<typeof operatorFuncs[N]>
}

const a: Operator<boolean> = {"==": [1, 2]}
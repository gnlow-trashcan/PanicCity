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
    F extends (input: infer I) => any ? I :
    Parameters<F>

type OperatorInputFromName<N extends OperatorNames> = OperatorInputFromFunc<typeof operatorFuncs[N]>

type Operator<O> = Partial<{
    [N in OperatorNamesByOutputType<O>]: OperatorInputFromName<N>
}> /* Should be single-key object. Tried https://stackoverflow.com/a/57576688 , but it occurs error. */

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
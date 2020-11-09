const operatorFuncs = {
    "==": (a: any, b: any) => a == b
}
type OperatorNames = keyof typeof operatorFuncs

type Operator<
    N extends OperatorNames = OperatorNames
> = {[K in N]: Parameters<typeof operatorFuncs[K]>}

type OperatorOutput<N extends OperatorNames> = ReturnType<typeof operatorFuncs[N]>

interface Ability {
    if: Operator
}
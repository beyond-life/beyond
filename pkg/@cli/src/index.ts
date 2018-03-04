export namespace decl {
    export const WILD :unique symbol = Symbol("<*>")
    export type Wild = typeof WILD

    export const F_BOOL :unique symbol = Symbol("<~>")
    export type FBool = typeof F_BOOL

    export type NonOpt = string | Wild

    export interface Opt {
        [key :string] :NonOpt | FBool
    }

    export type Arg = NonOpt | Opt
}

export function parse(
    decls :decl.Arg[],
) {
    return (args :string[])=> {

    }
}
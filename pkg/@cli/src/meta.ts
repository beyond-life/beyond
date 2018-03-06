import "reflect-metadata"

import {
    Int,
} from "@beyond-life/lowbar"

// ~~~

export namespace schema {
    export const F_STR :unique symbol =
        Symbol("<string flag>")
    export const F_NUM :unique symbol =
        Symbol("<numeric flag>")
    export const F_BOOL :unique symbol =
        Symbol("<boolean flag>")

    export const SYX_SHORT :unique symbol =
        Symbol("<short flag syntax>")
    export const SYX_LONG :unique symbol =
        Symbol("<long flag syntax>")
    export type Syx = typeof SYX_SHORT | typeof SYX_LONG


    export type NonOpt = string[] | typeof F_STR | typeof F_NUM

    export interface Opt {
        [key :string] :NonOpt | typeof F_BOOL
    }

    export type Arg = NonOpt | Opt
}

export interface PostO {
    _: string[]
    [key :string] :string[]
}

type Reduc = [number, PostO]

export function short(
    char :string,
) :PropertyDecorator {
    [char] = [...char] // stripping further chars

    return Reflect.metadata(schema.SYX_SHORT, char)
}

export function parse(
    decls :schema.Arg[],
) {
    return (
        args :string[],
    ) :PostO => {
        args.reduce(
            (l :Reduc, r): Reduc => {
                const {startsWith} = r
                const kind :[
                    schema.Syx | null,
                    Int,
                ][] = startsWith("--")
                    ? [schema.SYX_LONG, 2]
                    : startsWith("-")
                    ? [schema.SYX_SHORT, 1]
                    : [null, 0]

               const content = r.substr(kind[1])
            },
            [],
        )
    }
}
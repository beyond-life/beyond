import "reflect-metadata"

// @@@

import {
    Int,
} from "@beyond-life/lowbar"

import {
    DataTy,
    SyxForm,
    Cmd,
    Arg,
} from "./schema"

// ~~~

export interface PostO {
    [Cmd.DASH_DASH] :any[]
    [key :string] :any[]
}

type Reduc = [number, PostO]

export function parse(
    decls :Arg[],
) {
    return (
        args :string[],
    ) :PostO => {
        args.reduce(
            (l :Reduc, r): Reduc => {
                const {startsWith} = r
                const rSyxForm :[
                    SyxForm.Flag,
                    Int,
                ] = startsWith("--")
                    ? [SyxForm.LONG, 2 as Int]
                    : startsWith("-")
                    ? [SyxForm.SHORT, 1 as Int]
                    : [Cmd.DASH_DASH, 0 as Int]

               const content = r.substr(rSyxForm[1])
            },
            [],
        )
    }
}
import "reflect-metadata"

import {
    Int,
} from "@beyond-life/lowbar"

import {
    Data,
    SyxForm,
    Cmd,
} from "./schema"

// ~~~

export interface PostO {
    [Cmd.DEFAULT] :any[]
    [key :string] :any[]
}

type Reduc = [number, PostO]

export function alias(
    aliArg :string[] | string,
    form :SyxForm.Uq = SyxForm.SHORT,
) :PropertyDecorator {
    const isArr = Array.isArray
    const ali :string[] = SyxForm.SHORT === form
        ? isArr(aliArg)
        ? aliArg.map((char :string) :string => [...char][0])
        //… Extractin first code point
        : [...aliArg]

        : isArr(aliArg)
        ? aliArg
        : [aliArg]

    return (Reflect as any).metadata(form, ali)
}

export function inital<Init>(

) :PropertyDecorator {

    return {} as any
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
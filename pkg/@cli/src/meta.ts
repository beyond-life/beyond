import "reflect-metadata"

import {
    Int,
} from "@beyond-life/lowbar"

import {
    dataType,
    syxForm,
} from "./schema"

// ~~~

export interface PostO {
    _: string[]
    [key :string] :string[]
}

type Reduc = [number, PostO]

export function alias(
    ali :string[] | string,
    form :syxForm.Uq = syxForm.SHORT,
) :PropertyDecorator {
    const shorters :string[] = (Array.isArray(shorts)
        ? shorts.map((char :string) :string => [...char][0])
        : [...shorts]
    )
    //… Extractin first code point

    return (Reflect as any).metadata(syxForm.SHORT, shorters)
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
import "reflect-metadata"

import {
    normalize,
} from "path"

// @@@

import {
    Int,
} from "@beyond-life/lowbar"

import {
    Data,
    SyxForm,
} from "./schema/flag"
import {
    Arg, 
    Cmd,
} from "./schema/cmd"

// ~~~

export interface PostO {
    [Cmd.DASH_DASH] :any[]
    [key :string] :any[]
}

export function parse(
    decls :Arg[],
) {
    return (args :string[]) :PostO[] => {
    }
}
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
} from "./schema/data"
import {
    SyxForm,
} from "./schema/flag"
import {
    Arg, 
    Cmd,
} from "./schema/cmd"

// ~~~

export function parse(
    decls :Arg[],
) {
    return (args :string[]) :any[] => {
        // TODO
        return []
    }
}
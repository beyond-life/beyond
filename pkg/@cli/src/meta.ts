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
    Cmd,
    Arg,
} from "./schema"
const {Ty, INITIAL} = Data

// ~~~

export interface PostO {
    [Cmd.DASH_DASH] :any[]
    [key :string] :any[]
}

namespace Env {
    export const {SHORT} = SyxForm
    export const {DASH_DASH} = Cmd
    export const {CONTENT} = Data

    export type Uq = never
        | typeof SHORT
        | typeof DASH_DASH
        | typeof CONTENT
}

interface Reduc {
    tail :string
    env :Env.Uq
}

export function parse(
    decls :Arg[],
) {
    return (args :string[]) :PostO[] => {
        args.reduce(
            (l :Reduc, r): Reduc => {
                const {startsWith, indexOf} = r
                const i = indexOf(" ") as Int

                function mkRelShift() :{
                    shift :Int[]
                } {
                    if (l.env === SyxForm.SHORT)
                        return {
                            shift: [0 as Int, 1 as Int],
                        }
                    else
                    if (startsWith("--")) {
                        const lShift = 2 as Int
                        return {
                            shift: [lShift, i - lShift as Int],
                        }
                    } else {
                        const lShift = 1 as Int
                        return {
                            shift: [0 as Int, 9 as Int],
                        }
                    }
                }

                const {shift} = mkRelShift()
                const content = r.substr(shift[0], shift[1])
            },
            {
                tail: args.join(" "),
                env: Env.CONTENT,
            },
        )

        return {} as {}
    }
}
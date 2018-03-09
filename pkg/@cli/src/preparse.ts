import {
    Int,
    isInt,
    Prop,
    isStr,
} from "@beyond-life/lowbar"

import {
    AUTOM,
    Data,
    Flag,
    SyxForm,
} from "./schema/flag"

import {Cmd} from "./schema/cmd"

// ~~~

export namespace Env {
    export const {SHORT} = SyxForm
    export const {DASH_DASH} = Cmd
    export const {SY_DATA} = Data

    export type Uq = never
        | typeof SHORT
        | typeof DASH_DASH
        | typeof SY_DATA
}

export interface Reduc {
    tail :string
    env :Env.Uq
}

export type Stripple = [
      string, //init sequence
      string, //short syntax form
      string] //long syntax form

function shiftRel(
    tail :string,
    env :Env.Uq,
) :{
    shift :Int[]
} {
    const {startsWith, indexOf} = tail
    const spaceI = indexOf(" ") as Int

    if (env === SyxForm.SHORT)
        return {
            shift: [0 as Int, 1 as Int],
        }
    else
    if (startsWith("--")) {
        const lShift = 2 as Int
        return {
            shift: [lShift, spaceI - lShift as Int],
        }
    } else
    if (startsWith("-")) {
        const lShift = 1 as Int
        return {
            shift: [0 as Int, 9 as Int],
        }
    }

    throw new Error("preparse: Flag expected!")
}

export default function preparse(
    args :string[],
    delims = new class {
        ;[Flag.SY_FLAG] :Stripple = ["-- ", "-", "--"]
        ;[Data.SY_DATA] :Stripple = ["=", "", ","]
    },
) {

}
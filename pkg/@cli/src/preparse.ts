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

export namespace Delim {
    export class Bluepr {
        ;[Flag.SY_FLAG] :Stripple = ["-- ", "-", "--"]
        ;[Data.SY_DATA] :Stripple = ["=", "", ","]
    }

    export interface Inter extends Bluepr {}
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
    {
        [Flag.SY_FLAG]: flagDelims,
        [Data.SY_DATA]: dataDelims,
    } :Delim.Inter,
) :{
    shift :Int[]
} {
    if (env === SyxForm.SHORT) return {
        shift: [0 as Int, 1 as Int],
    }

    const {startsWith, indexOf} = tail

    const flagDelimLens = (flagDelims as Stripple).map((e, i) =>
        [i, e.length]
    ).sort((l, r) =>
        l[1] - r[1]
    )

    //TODO

    throw new Error("preparse: Flag expected!")
}

export default function preparse(
    args :string[],
    delims :Delim.Inter = new Delim.Bluepr,
) {

}
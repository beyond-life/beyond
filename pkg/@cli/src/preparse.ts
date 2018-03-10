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
) {
    if (env === SyxForm.SHORT) return {
        shift: [0 as Int, 1 as Int],
    }

    const {startsWith, indexOf} = tail

    const flagDelimLens = (flagDelims as Stripple).map((e, i) =>
        [i, e, e.length] as [Int, string, Int]
    ).sort((l, r) =>
        l[2] - r[2]
    )
    const flagKindI = flagDelimLens.reduce((
        l :Int | null,
        [kindI, delim, len] :[Int, string, Int],
        i :number,
    ) :Int | null => {
        if (isInt(l)) return l

        if (!startsWith(delim)) return null

        return kindI
    }, null)
    const flagKindSy = (() => {switch (flagKindI) {
        case 0:
            return Cmd.DASH_DASH
        case 1:
            return SyxForm.SHORT
        case 2:
            return SyxForm.LONG
        case null:
            //TODO
    }})()
}

export default function preparse(
    args :string[],
    delims :Delim.Inter = new Delim.Bluepr,
) {

}
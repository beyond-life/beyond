import {
    Int,
    isInt,
    Prop,
    isStr,
} from "@beyond-life/lowbar"

import {Data} from "./schema/data"
import {
    AUTOM,
    Flag,
    SyxForm,
} from "./schema/flag"

import {Cmd} from "./schema/cmd"

// ~~~

export namespace Env {
    export const {SHORT, LONG} = SyxForm
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

function recogFlag(
    tail :string,
    env :Env.Uq,
    {
        [Flag.SY_FLAG]: flagDelims,
        [Data.SY_DATA]: dataDelims,
    } :Delim.Inter,
) :[Env.Uq, Int] | null {
    if (env === SyxForm.SHORT) return [Env.SHORT, 0 as Int]

    const {startsWith, indexOf} = tail

    const delimLengths = (flagDelims as Stripple).map((e, i) =>
        [i, e, e.length] as [Int, string, Int]
    ).sort((l, r) =>
        l[2] - r[2]
    )
    const [kindI, shiftLen] = delimLengths.reduce((
        l :[Int, Int] | [null, null],
        [kindI, delim, len] :[Int, string, Int],
        i :number,
    ) :[Int, Int] | [null, null] => {
        if (null !== l[0]) return l

        if (!startsWith(delim)) return [null, null]

        return [kindI, len as Int]
    }, [null, null])
    const kindSy = (() => {switch (kindI) {
        case 0:
            return Env.DASH_DASH
        case 1:
            return Env.SHORT
        case 2:
            return Env.LONG
        case null:
        default:
            return null
    }})()

    return null === kindSy
        ? null
        : [kindSy, shiftLen] as [Env.Uq, Int] 
}

export default function preparse(
    args :string[],
    delims :Delim.Inter = new Delim.Bluepr,
) {

}
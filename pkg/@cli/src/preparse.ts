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
        ;[Flag.SY_FLAG] :Stripple = ["--\n", "-", "--"]
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

function recogKind(
    tail :string,
    delim3 :Stripple,
) {
    const dLengths = delim3.map((e, i) =>
        [i, e, e.length] as [Int, string, Int]
    ).sort((l, r) =>
        r[2] - l[2]
    )
    const [i, len] = dLengths.reduce((
        l :[Int, Int] | [null, null],
        [kindI, curDelim, curLen] :[Int, string, Int],
        i :number,
    ) :[Int, Int] | [null, null] => {
        if (null !== l[0]) {
            const matDelim = delim3[l[0]!]
            console.log(
                `\n$  Matched delim: <<${matDelim}>> (${l[0]})`,
            )
            return l
        }

        console.log("\n$  Testing delim: <<" + curDelim + ">>")
        if (!tail.startsWith(curDelim)) return [null, null]

        return [kindI, curLen as Int]
    }, [null, null])

    return i && [i, len]
}

function recogFlag(
    tail :string,
    env :Env.Uq,
    {[Flag.SY_FLAG]: flagDelims} :Delim.Inter,
) :[Env.Uq, Int] | null {
    if (env === SyxForm.SHORT) return [Env.SHORT, 0 as Int]

    const kindRecog = recogKind(tail, flagDelims)

    if (null === kindRecog) return null

    const kindSy = (() => {switch (kindRecog[0]) {
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
        : [kindSy, kindRecog[1]] as [Env.Uq, Int] 
}

function recogData(
    tail :string,
    env :Env.Uq,
    {[Data.SY_DATA]: dataDelims} :Delim.Inter,
) {

}

export default function preparse(
    args :string[],
    delims :Delim.Inter = new Delim.Bluepr,
) {
    const argStr = args.join("\n")
    const env = Env.DASH_DASH

    const flagRecog = recogFlag(
        argStr,
        env,
        delims,
    )

    if (null === flagRecog) {
        console.log("\n!  No flag recognized…")

        const dataRecog = recogData(
            argStr,
            env,
            delims,
        )
    } else {
        console.log(
            `\n!  Flag recognized: ${flagRecog[0]}`
        )
    }
}
const fromPoi = String.fromCodePoint

// @@@

import {
    Int, isInt,
    Prop,
    isStr,
    till, range,
} from "@beyond-life/lowbar"

import {Latin} from "../char-pois"

import {
    Data,
    Ty,
} from "../schema/data"
import {
    AUTOM,
    Flag,
    SyxForm,
} from "../schema/flag"
import {Cmd} from "../schema/cmd"

import {
    FlagTy,
    Bluepr as EnvBluepr,
    default as Env,
} from "./env"

// ~~~

function recogKind<
      Kind extends symbol>(
    tail :Int[],
    delims :Int[][],
    kinds :Kind[],
) :[Kind, Int] | null {
    const dLengths = delims.map((e, i) =>
        [i, e] as [Int, Int[]]
    ).sort((l, r) =>
        r[1].length - l[1].length
    )
    const [i, len] = dLengths.reduce((
        l :[Int, Int] | [null, null],
        [kindI, curDelim] :[Int, Int[]],
        i :number,
    ) :[Int, Int] | [null, null] => {
        if (null !== l[0]) {
            const matDelim = delims[l[0]!]
            console.log(
                `\n$  Matched delim: <<${fromPoi(...matDelim)}>> (${l[0]})`,
            )
            return l
        }

        console.log("\n$  Testing delim: <<" + curDelim + ">>")

        const curLen = curDelim.length as Int

        if (tail.slice(0, curLen).every((e, i) =>
            curDelim[i] === e
        )) return [kindI, curLen]

        return [null, null]
    }, [null, null])

    return i && len && [kinds[i], len]
}

const assignables :FlagTy.Uq[] = [
    FlagTy.SHORT,
    FlagTy.LONG,
]

function recogFlag(
    tail :Int[],
    env :Env,
) :[FlagTy.Uq, Int] | null {
    const {minus} = Latin.sign
    const dashDash = ([] as Int[]).fill(minus[0], 0, 2)
    const kindRecog = recogKind(tail, [
        [minus[0]],
        dashDash,
    ], assignables)
    const isLong = kindRecog && FlagTy.LONG === kindRecog[0]

    if (isLong && !tail.slice(kindRecog![1]).length)
        return [FlagTy.DASH_DASH, 2 as Int]

    return kindRecog
}

function recogData(
    tail :Int[],
    env :Env,
) {

}

function findEq(
    tail :Int[],
    env :Env,
) :Int | null {
    const {equal} = Latin.sign
    const isAssignable = assignables.includes(env.flagTy!)

    if (!isAssignable || !tail.includes(equal[0]))
        return null

    return tail.indexOf(equal[0]) as Int
}

export default function preparse(
    arg :Int[],
) {
    const env = new EnvBluepr()

    const flagRecog = recogFlag(
        arg,
        env,
    )

    if (null === flagRecog) {
        console.log("\n!  No flag recognized…")

        const dataRecog = recogData(arg, env)
    } else {
        const flagArg = arg.slice(flagRecog[1])
        const flagTy = flagRecog[0]
        const findEnv = {
            flagTy,
            dataTy: null,
        }
        const eqPos = findEq(flagArg, findEnv)
        const flagName = null === eqPos
            ? flagArg
            : flagArg.slice(0, eqPos)
        const flagStr = fromPoi(...flagName)

        console.log(
            `\n!  Flag recognized: "${flagStr}" <::> ${flagTy}`
        )
    }
}
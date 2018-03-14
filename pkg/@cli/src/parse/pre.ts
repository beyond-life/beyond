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
    Env,
    State,
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
        if (null !== l[0]) return l

        console.log(
            `\n$  Testing delim: <<${fromPoi(...curDelim)}>> (${kindI}: ${kinds[kindI].toString()})`
        )

        const curLen = curDelim.length as Int
        const tailSlice = tail.slice(0, curLen)

        console.log(tailSlice.map((e, i) => curDelim[i] === e))
        
        if (tailSlice.every((e, i) =>
            curDelim[i] === e
        )) return [kindI, curLen]

        console.log(
            `\n$  Failing at delim: #${curDelim.join(":")} != #${tailSlice.join(":")}`
        )

        return [null, null]
    }, [null, null])

    return null !== i && null !== len
        ? [kinds[i], len]
        : null
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
    const dashDash = new Array(2).fill(minus[0])
    const kindRecog = recogKind(tail, [
        [minus[0]],
        dashDash,
    ], assignables)
    const isLong = kindRecog && FlagTy.LONG === kindRecog[0]

    if (isLong && !tail.slice(kindRecog![1]).length)
        return [FlagTy.DASH_DASH, 2 as Int]

    return kindRecog
}

function isList(
    tail :Int[],
    {flagTy, dataTy} :Env,
) :boolean {
    const isDataBegin = assignables.includes(flagTy!) && null === dataTy

    return isDataBegin && Latin.brac.bracket[0] === tail[0]
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

export function parse(
    tail :Int[],
    env :Env,
) :State {
    const flagRecog = recogFlag(
        tail,
        env,
    )

    if (null !== flagRecog) {
        const argStrip = tail.slice(flagRecog[1])
        const flagTy = flagRecog[0]
        const findEnv = {
            flagTy,
            dataTy: null,
        }
        const eqPos = findEq(argStrip, findEnv)
        const [content, overflow] = null === eqPos
            ? [argStrip, null]
            : [
                argStrip.slice(0, eqPos),
                argStrip.slice(eqPos as number + 1),
            ]
        const contentStr = fromPoi(...content)

        console.log(
            `\n!  Flag recognized: "${contentStr}" <::> ${flagTy.toString()}`
        )

        return {
            flagTy,
            dataTy: null,
            content, overflow,
        }
    }

    if (isList(tail, env)) {
        const flagTy = env.flagTy

        console.log("\n!  List recognized…")

        return {
            flagTy,
            dataTy: Ty.LIST,
            content: [],
            overflow: tail,
        }
    }

    console.log("\n!  No flag or list recognized…")
    // TODO
}

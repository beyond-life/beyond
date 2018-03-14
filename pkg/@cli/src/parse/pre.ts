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
    Data, Flag,
} from "./kind"

import {
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

const assignableFlags :Flag.Uq[] = [
    Flag.SHORT,
    Flag.LONG,
]

function recogFlag(
    tail :Int[],
    env :Env,
) :[Flag.Uq, Int] | null {
    const {minus} = Latin.sign
    const dashDash = new Array(2).fill(minus[0])
    const kindRecog = recogKind(tail, [
        [minus[0]],
        dashDash,
    ], assignableFlags)
    const isLong = kindRecog && Flag.LONG === kindRecog[0]

    if (isLong && !tail.slice(kindRecog![1]).length)
        return [Flag.DASH_DASH, 2 as Int]

    return kindRecog
}

function isList(
    tail :Int[],
    {flagKind, dataKind} :Env,
) :boolean {
    const isDataBegin = assignableFlags.includes(flagKind!) && null === dataKind

    return isDataBegin && Latin.brac.bracket[0] === tail[0]
}

function findEq(
    tail :Int[],
) :Int | null {
    const {equal} = Latin.sign

    return tail.includes(equal[0])
        ? tail.indexOf(equal[0]) as Int
        : null
}

export function parse(
    tail :Int[],
    env :Env,
) :State {
    // TODO Handeling overflow

    const isDataEnv = env.flagKind && (!env.dataKind ||
          Data.LIST === env.dataKind)

    if (isDataEnv) {
        return //TODO
    }

    const flagRecog = recogFlag(
        tail,
        env,
    )

    if (null !== flagRecog) {
        const argStrip = tail.slice(flagRecog[1])
        const flagKind = flagRecog[0]
        const eqPos = assignableFlags.includes(flagKind)
            ? findEq(argStrip)
            : null
        const [dataTy, content, overflow] = null === eqPos
            ? [Data.EMPTY, argStrip, []]
            : [
                null,
                argStrip.slice(0, eqPos),
                argStrip.slice(eqPos as number + 1),
            ]
        const contentStr = fromPoi(...content)

        console.log(
            `\n!  Flag recognized: "${contentStr}" <::> ${flagKind.toString()}`
        )

        return {
            flagKind,
            dataKind: null,
            content, overflow,
        }
    }

    if (isList(tail, env)) {
        const {flagKind} = env

        console.log("\n!  List recognized…")

        return {
            flagKind,
            dataKind: Data.LIST,
            content: [],
            overflow: tail,
        }
    }

    console.log("\n!  No flag or list recognized…")
    // TODO
}

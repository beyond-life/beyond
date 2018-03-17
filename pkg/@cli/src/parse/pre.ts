import {
    Int, isInt,
    Prop, getArrIndex,
    isStr, fromPoi,
    till, range,
    log,
    proto,
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

        log(0o1)`Testing delim: ${fromPoi(...curDelim)} (${kindI})`

        const curLen = curDelim.length as Int
        const tailSlice = tail.slice(0, curLen)

        
        if (tailSlice.every((e, i) =>
            curDelim[i] === e
        )) return [kindI, curLen]

        log(0o1)`Failing at delim: ${curDelim.join(":")} != ${tailSlice.join(":")}`

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

    return kindRecog
}

function isList(
    tail :Int[],
    {flagKind, dataKind} :Env,
) :boolean {
    const isDataBegin = assignableFlags.includes(flagKind!) && null === dataKind

    return isDataBegin && Latin.brac.bracket[0] === tail[0]
}

export function parseFlagPrefix(
    overflow :Int[],
    {flagKind} :Env,
) :State {
    log(0o3)`Flag recognized: ${fromPoi(...overflow)}`

    return {
        flagKind,
        dataKind: null,
        content: [],
        overflow,
    }
}

export function parseFlag(
    tail :Int[],
    {flagKind} :Env,
) :State {
    const eqPos = assignableFlags.includes(flagKind!)
        ? getArrIndex(tail, Latin.sign.equal[0])
        : null
    const [dataKind, content, overflow] = null === eqPos
        ? [Data.EMPTY, tail, []]
        : [
            null,
            tail.slice(0, eqPos),
            tail.slice(eqPos as number + 1),
        ]
    const contentStr = fromPoi(...content)

    log(0o3)`Flag recognized: ${contentStr} as ${flagKind}`

    return {
        flagKind,
        dataKind,
        content, overflow,
    }
}

export function parseData(
    tail :Int[],
    env :Env,
) :State {
    log(0o3)`Switchin to data parser for: ${fromPoi(...tail)}`
    
    const {flagKind} = env

    if (isList(tail, env)) {
        log(0o3)`List recognized…`

        return {
            flagKind,
            dataKind: Data.LIST,
            content: [],
            overflow: tail.slice(1),
        }
    }
    
    log(0o3)`Raw recognized: ${fromPoi(...tail)}`

    return {
        flagKind,
        dataKind: Data.RAW,
        content: tail,
        overflow: [],
    }
}

export function parse(
    tail :Int[],
    env :Env,
) :State {
    const isFlagEnv = env.flagKind && (!env.dataKind ||
          Data.LIST === env.dataKind)

    if (isFlagEnv) return (content.length
        ? parseData
        : parseFlag
    )(tail, env)

    const flagRecog = recogFlag(tail, env)

    if (null !== flagRecog) {
        const [flagKind, shift] = flagRecog
        const env = proto({flagKind}, Env.Bluepr)

        return parseFlagPrefix(tail.slice(shift), env)
    }

    }

    return parseData(tail, env)
}

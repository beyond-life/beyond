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

function recogFlagKind(
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

export function parseDataPrefix(
    tail :Int[],
    env :Env,
) :State {
    log(0o3)`Switchin to data parser for: ${fromPoi(...tail)}`
    
    const {flagKind} = env
    const {brac, sign} = Latin
    const [dataKind, shift] = recogKind(tail, [
        [brac.bracket[0]],
        [sign.equal[0]],
        [sign.plus[0]],
        [sign.minus[0]],
    ], [
        Data.LIST,
        Data.RAW,
        Data.NUM,
        Data.NUM,
    ]) || [
        Data.CHAR,
        0
    ]
    const content = Data.LIST === dataKind
        ? tail.slice(0, shift)
        : []

    log(0o3)`${dataKind} (${fromPoi(...content)}) recognized…`

    return {
        flagKind,
        dataKind,
        content,
        overflow: tail.slice(shift),
    }
}

export function parse(
    tail :Int[],
    env :Env,
) :State {
    const isFlagEnv = env.flagKind && (!env.dataKind ||
          Data.LIST === env.dataKind)

    if (isFlagEnv) return (content.length
        ? parseDataPrefix
        : parseFlag
    )(tail, env)

    const flagRecog = recogFlagKind(tail, env)

    if (null !== flagRecog) {
        const [flagKind, shift] = flagRecog
        const env = proto({flagKind}, Env.Bluepr)

        return parseFlagPrefix(tail.slice(shift), env)
    }

    return parseDataPrefix(tail, env)
}

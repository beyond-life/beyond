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

        log(0o1)`Testing delim: ${fromPoi(...curDelim)} (${kindI}) at: ${
            tail.slice(0, 4).map((e :Int)=> e.toString(16))
        }`

        const curLen = curDelim.length as Int
        const tailSlice = tail.slice(0, curLen)

        
        if (tailSlice.every((e, i) =>
            curDelim[i] === e
        )) return [kindI, curLen]

        log(0o1)`Failing at delim…`

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
    tail :Int[],
    shift :Int,
    {flagKind} :Env,
) :State {
    log(0o3)`Parsing flag prefix: ${flagKind} (${shift})`

    return {
        flagKind,
        flagged: false,
        dataKind: null,
        content: [],
        overflow: tail.slice(shift),
    }
}

export function parseFlag(
    tail :Int[],
    {flagKind} :Env,
) :State {
    const shift :Int | null = Flag.SHORT === flagKind && 0 as Int !== tail[0]
        ? 1 as Int
        : Flag.LONG === flagKind
        ? getArrIndex(tail, Latin.sign.equal[0])
        : null
    const [dataKind, content, overflow] = null === shift
        ? [Data.RAW, [], tail]
        : [
            null,
            tail.slice(0, shift),
            tail.slice(shift),
        ]
    const contentStr = fromPoi(...content)

    log(0o3)`Flag ${flagKind}:${dataKind} recognized: ${contentStr}`

    return {
        flagKind,
        flagged: true,
        dataKind,
        content,
        overflow,
    }
}

export function parseDataPrefix(
    tail :Int[],
    env :Env,
) :State {
    log(0o3)`Switchin to data prefix parser for: ${fromPoi(...tail)}`
    
    const {brac, digit, sign} = Latin
    const dataSigns :Int[][] = [
        [0 as Int],
        [brac.bracket[0]],
        [sign.equal[0]],
        [sign.plus[0]],
        [sign.minus[0]],
        ...digit.arabic.map((dig)=> [dig])
    ]
    const digitKinds :(typeof Data.DIGIT)[] =
        Array(digit.arabic.length).fill(Data.DIGIT)
    const [dataKindG, shift] = recogKind(tail, dataSigns, [
        Flag.MAIN,
        Data.LIST,
        Data.RAW,
        Data.NUM,
        Data.NUM,
        ...digitKinds,
    ]) || [
        Data.EMPTY,
        0 as Int,
    ]
    const content = Data.LIST === dataKindG
        ? tail.slice(0, shift)
        : []
    const [flagKind, dataKind] = Flag.MAIN === dataKindG
        ? [null, null]
        : [env.flagKind, dataKindG]
    

    log(0o3)`${dataKindG} (${fromPoi(...content)}) recognized…`

    return {
        flagKind,
        flagged: true,
        dataKind,
        content,
        overflow: tail.slice(shift),
    }
}

export function parse(
    tail :Int[],
    env :Env,
) :State {
    const isFlagEnv = env.flagKind && !env.dataKind

    if (isFlagEnv) return (env.flagged
        ? parseDataPrefix
        : parseFlag
    )(tail, env)

    const flagRecog = recogFlagKind(tail, env)

    if (null !== flagRecog) {
        const [flagKind, shift] = flagRecog
        const env = proto({flagKind}, Env.Bluepr)

        return parseFlagPrefix(tail, shift, env)
    }

    return parseDataPrefix(tail, env)
}

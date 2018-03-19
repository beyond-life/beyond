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

function recogKinds<
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
    const kindRecog = recogKinds(tail, [
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
        ...digit.arabic.map((dig)=> [dig])
    ]
    const digitKinds :(typeof Data.DIGIT)[] =
        Array(digit.arabic.length).fill(Data.DIGIT)
    const [dataKindG, shift] = recogKinds(tail, dataSigns, [
        Data.EMPTY,
        Data.LIST,
        Data.RAW,
        ...digitKinds,
    ]) || [
        Data.EMPTY,
        0 as Int,
    ]
    const content = Data.LIST === dataKindG
        ? tail.slice(0, shift)
        : []
    const [flagKind, dataKind] = Data.EMPTY === dataKindG
          && shift
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

export function parseData(
    tail :Int[],
    {flagKind, dataKind} :Env,
) :State {
    log(0o3)`Switchin to data content parser for: ${fromPoi(...tail)}`

    const {bracket} = Latin.brac
    const wordEnd = getArrIndex(tail, 0 as Int) || tail.length as Int
    const isListEnd = Data.LIST === dataKind
          && bracket[1] === tail[wordEnd - 1]
    const shift = isListEnd
        ? wordEnd - 1
        : wordEnd

    switch (dataKind) {
        case Data.LIST: case Data.RAW: return {
            flagKind,
            flagged: true,
            dataKind,
            content: tail.slice(0, shift),
            overflow: tail.slice(shift),
        }
        default: throw "Data kind currently unimplemented."
    }
}

export function parse(
    tail :Int[],
    env :Env,
) :State {
    const {flagKind, flagged, dataKind} = env

    if (flagKind)
        return ([null, Data.EMPTY].includes(dataKind)
            ? flagged
            ? parseDataPrefix
            : parseFlag
            : parseData
        )(tail, env)

    const flagRecog = recogFlagKind(tail, env)

    if (null !== flagRecog) {
        const [flagKind, shift] = flagRecog
        const env = proto({flagKind}, Env.Bluepr)

        return parseFlagPrefix(tail, shift, env)
    }

    return {
        flagKind: Flag.MAIN,
        flagged: true,
        dataKind: null,
        overflow: tail,
        content: [],
    }
}

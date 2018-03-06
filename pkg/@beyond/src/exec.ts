import {
    Readable,
    Writable,
} from "stream"

import $ from "xstream"
import fromEv from "xstream/extra/fromEvent"
import {run} from "@cycle/run"

import {
    proto,
} from "@beyond-life/lowbar"

// ~~~

export const HEX_STR :unique symbol =
    Symbol("<hexademical string>")

export type Format = typeof HEX_STR

export namespace flg {
    export class Bluepr {
         format :Format = HEX_STR
    }
    export interface Inter extends Bluepr {}
    export type Flags = Partial<Inter>
}

type FoldChunkL = [string, boolean]
function foldChunk$(
    [
        lAcc, // left accumulator
        lNlned, // is left newlined?
    ] :FoldChunkL,
    r :Buffer,
) :FoldChunkL {
    const rUtf = r.toString("utf-8")
    const rNlned = rUtf.endsWith("\n")

    if (rNlned) console.error("> Newline detected…")
    else console.error("> Chunk consumed…")
    
    return [
        lNlned
            ? rUtf
            : lAcc + rUtf,
        rNlned,
    ]
}

export default function exec(
    input :Readable,
    output :Writable,
    flags :flg.Flags = {},
) {
    const flags2 = proto(flags, flg.Bluepr)

    input.resume()

    const chunk$ = fromEv(input, "data")
    const chunkSeed :FoldChunkL = ["", false]
    const data$ = chunk$
        .fold(foldChunk$, chunkSeed)
        .filter(([_, nlned] :FoldChunkL) :boolean => nlned)
        .map(([acc, _] :FoldChunkL) :string => acc)

    data$.subscribe({
        next: (acc)=> console.error("==> " + acc),
        error: (err)=> console.error("> " + err.message),
        complete: ()=> console.error("> Completed!"),
    })
}
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

export default function exec(
    input :Readable,
    output :Writable,
    flags :flg.Flags = {},
) {
    const flags2 = proto(flags, flg.Bluepr)

    const data$ = fromEv(input, "data")
}
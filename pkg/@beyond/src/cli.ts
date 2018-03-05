import {
    Readable,
    Writable,
} from "stream"

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

export function run(
    input :Readable,
    output :Writable,
    flags :flg.Flags = {},
) {
    const flags2 = proto(flags, flg.Bluepr)
}
import {
    Int, isInt,
} from "@beyond-life/lowbar"

import {
    Data,
    Ty,
} from "./schema/data"
import {
    SyxForm,
    Flag,
} from "./schema/flag"
import {Cmd} from "./schema/cmd"

// ~~~

export namespace FlagTy {
    export const {SHORT, LONG} = SyxForm
    export const {SY_MAIN} = Flag
    export const {DASH_DASH} = Cmd

    export type Uq = never
        | typeof SHORT
        | typeof LONG
        | typeof SY_MAIN
        | typeof DASH_DASH
}

export class Bluepr {
    flagTy :FlagTy.Uq | null = null
    dataTy :Ty.Uq | null = null
    numBase :Int = 10 as Int
}

export default interface Env extends Bluepr {}
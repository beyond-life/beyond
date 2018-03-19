import {
    Int, isInt,
} from "@beyond-life/lowbar"

import {
    Ty as DataTy,
    Data as DataSchm,
} from "../schema/data"
import {
    SyxForm,
    Flag as FlagSchm,
} from "../schema/flag"
import {Cmd} from "../schema/cmd"

// ~~~

export namespace Data {
    export const {LIST, NUM} = DataTy
    export const CHAR = DataTy.STR
    export const RAW = DataSchm.SY_DATA
    export const EMPTY = DataSchm.INITIAL

    export type Uq = never
        | typeof LIST
        | typeof RAW
        | typeof EMPTY
}

export namespace Flag {
    export const {SHORT, LONG} = SyxForm
    export const MAIN = FlagSchm.SY_MAIN

    export type Uq = never
        | typeof SHORT
        | typeof LONG
        | typeof MAIN
}
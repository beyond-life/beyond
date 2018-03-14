import {
    Int, isInt,
} from "@beyond-life/lowbar"

import {
    Data,
    Ty,
} from "../schema/data"
import {
    SyxForm,
    Flag,
} from "../schema/flag"
import {Cmd} from "../schema/cmd"

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


export interface Env extends Env.Bluepr {}
export namespace Env {
    export class Bluepr {
        readonly flagTy :FlagTy.Uq | null = null
        readonly dataTy :Ty.Uq | null = null
    }
}
export default Env

export interface State extends State.Bluepr {}
export namespace State {
    export class Bluepr extends Env.Bluepr {
        readonly content = [] as Int[]
        readonly overflow :Int[] | null = null
    }
}
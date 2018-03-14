import {
    Int, isInt,
} from "@beyond-life/lowbar"

import {
    Data, Flag,
} from "./kind"

// ~~~

export interface Env extends Env.Bluepr {}
export namespace Env {
    export class Bluepr {
        readonly flagTy :Flag.Uq | null = null
        readonly dataTy :Data.Uq | null = null
    }
}
export default Env

export interface State extends State.Bluepr {}
export namespace State {
    export class Bluepr extends Env.Bluepr {
        readonly content = [] as Int[]
        readonly overflow = [] as Int[]
    }
}
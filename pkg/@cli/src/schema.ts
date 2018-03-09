import {
    Int,
} from "@beyond-life/lowbar"

// ~~~

// Flag's Data Type:
export namespace DataTy {
    export const STR :unique symbol =
        Symbol("<string flag>")
    export const NUM :unique symbol =
        Symbol("<numeric flag>")
    export const BOOL :unique symbol =
        Symbol("<boolean flag>")
        
    export type Uq = typeof STR | typeof NUM | typeof BOOL
}

export namespace FlagData {
    export const INITIAL_VAL :unique symbol =
        Symbol("<initial flag value>")
}

// Syntax Form:
export namespace SyxForm {
    export const SHORT :unique symbol =
        Symbol("<short flag syntax>")
    export const LONG :unique symbol =
        Symbol("<long flag syntax>")

    export type Uq = typeof SHORT | typeof LONG
    export type Flag = Uq | typeof Cmd.DASH_DASH
}

// Command Interface:
export interface Cmd {
    [key :string] :DataTy.Uq

    [Cmd.SUB_PREAMBLE] :string[]
}

export namespace Cmd {
    export const DASH_DASH :unique symbol =
        Symbol("<`--` \"default\" flag>")

    export const SUB_PREAMBLE :unique symbol =
        Symbol("<subcommand preamble words>")

    export abstract class Bluepr implements Cmd {
        [key :string] :DataTy.Uq
        //… For which reason? Y do I have to write the
        //  index in front of the properties?

        [Cmd.SUB_PREAMBLE] :string[] = []
    }
}

export type Arg = Cmd | Cmd[]
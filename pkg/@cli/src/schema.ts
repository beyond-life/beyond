import {
    Int,
} from "@beyond-life/lowbar"

// ~~~

// Flag's Data:
export namespace Data {
    export const CONTENT :unique symbol =
        Symbol("<data content>")

    export const INITIAL :unique symbol =
        Symbol("<initial flag value>")
}    

// Flag's Data Type:
export namespace Data.Ty {
    export const STR :unique symbol =
        Symbol("<string flag>")
    export const NUM : unique symbol =
        Symbol("<numeric flag>")
    export const NUM_INT :unique symbol =
        Symbol("<integer-numberic flag>")
    export const BOOL :unique symbol =
        Symbol("<boolean flag>")
        
    export type Uq = never
        | typeof STR
        | typeof NUM
        | typeof NUM_INT
        | typeof BOOL

    export type NativeVal = string | boolean | number
    export interface Ty2Native {
        [STR] :string
        [NUM] :number
        [NUM_INT] :number
        [BOOL] :boolean
    }
}

export const AUTOM :unique symbol =
    Symbol("<automagically complete>")

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
    [key :string] :Data.Ty.Uq

    [Cmd.SUB_CMD_PREAMBLE] :string[]
}

export namespace Cmd {
    export const DASH_DASH :unique symbol =
        Symbol("<`--` \"default\" flag>")

    export const SUB_CMD_PREAMBLE :unique symbol =
        Symbol("<subcommand preamble words>")

    export abstract class Bluepr implements Cmd {
        [key :string] :Data.Ty.Uq
        //… For which reason? Y do I have to write the
        //  index in front of the properties?

        [Cmd.SUB_CMD_PREAMBLE] :string[] = []
    }
}

export type Arg = Cmd | Cmd[]
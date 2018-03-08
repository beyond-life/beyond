import {
    Int,
} from "@beyond-life/lowbar"

// ~~~

// Flag's Data Type:
export class Data<T> {
    constructor (
        data :T,
        type? :Data.Uq | undefined,
        minCount :Int = 1 as Int,
    ) {

    }
}

export namespace Data {
    export const STR :unique symbol =
        Symbol("<string flag>")
    export const NUM :unique symbol =
        Symbol("<numeric flag>")
    export const BOOL :unique symbol =
        Symbol("<boolean flag>")
        
    export type Uq = typeof STR | typeof NUM | typeof BOOL
}


// Syntax From:
export namespace SyxForm {
    export const SHORT :unique symbol =
        Symbol("<short flag syntax>")
    export const LONG :unique symbol =
        Symbol("<long flag syntax>")

    export type Uq = typeof SHORT | typeof LONG
}

// Command:
export interface Cmd {
    [key :string] :Data.Uq
}

export namespace Cmd {
    export const SUB :unique symbol =
        Symbol("<subcommand>")

    export const DEFAULT :unique symbol =
        Symbol("<subcommand>")
}

export type Arg = Cmd | Cmd[]
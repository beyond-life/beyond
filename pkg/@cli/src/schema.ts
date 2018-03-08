import {
    Int,
} from "@beyond-life/lowbar"

// ~~~

// Flag's Data Type
export namespace dataType {
    export const STR :unique symbol =
        Symbol("<string flag>")
    export const NUM :unique symbol =
        Symbol("<numeric flag>")
    export const BOOL :unique symbol =
        Symbol("<boolean flag>")
        
    export type Uq = typeof STR | typeof NUM | typeof BOOL
}

export class Data<T> {
    constructor (
        data :T,
        type? :dataType.Uq | undefined,
        minCount :Int = 1 as Int,
    ) {

    }
}

// Syntax From:
export namespace syxForm {
    export const SHORT :unique symbol =
        Symbol("<short flag syntax>")
    export const LONG :unique symbol =
        Symbol("<long flag syntax>")

    export type Uq = typeof SHORT | typeof LONG
}

export interface Decl {
    [key :string] :Data
}
import {
    Int,
} from "@beyond-life/lowbar"

// ~~~

export const AUTOM :unique symbol =
    Symbol("<automagically complete>")


// Flag
export namespace Flag {
    export const SY_FLAG :unique symbol =
        Symbol("<flag content symbolization>")
    export const SY_MAIN :unique symbol =
        Symbol("<main content symbolization>")
}

// Flag's Syntax Form:
export namespace SyxForm {
    export const SHORT :unique symbol =
        Symbol("<short flag syntax>")
    export const LONG :unique symbol =
        Symbol("<long flag syntax>")

    export type Uq = typeof SHORT | typeof LONG
}

import {
    Int,
} from "@beyond-life/lowbar"

// ~~~

// Data:
export namespace Data {
    export const SY_DATA :unique symbol =
        Symbol("<data content symbolization>")

    export const INITIAL :unique symbol =
        Symbol("<flag's initial data value>")
}    

// Data Type:
export namespace Ty {
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

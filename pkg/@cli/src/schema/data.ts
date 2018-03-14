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
        Symbol("<string data>")
    export const NUM : unique symbol =
        Symbol("<numeric data>")
    export const NUM_INT :unique symbol =
        Symbol("<integer-numberic data>")
    export const BOOL :unique symbol =
        Symbol("<boolean data>")
    export const LIST :unique symbol =
        Symbol("<data list>")
        
    export type Uq = never
        | typeof STR
        | typeof NUM
        | typeof NUM_INT
        | typeof BOOL
        | typeof LIST

    export type NativeVal = string | boolean | number
    export interface Ty2Native {
        [STR] :string
        [NUM] :number
        [NUM_INT] :number
        [BOOL] :boolean
    }
}

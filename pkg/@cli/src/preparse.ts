import {
    Int,
    isInt,
    Prop,
    isStr,
} from "@beyond-life/lowbar"

import {
    AUTOM,
    Data,
    Flag,
    SyxForm,
} from "./schema/flag"

// ~~~

export type Stripple = [
      string, //init sequence
      string, //short syntax form
      string] //long syntax form

export default function preparse(
    args :string[],
    delims = new class {
        ;[Flag.SY_FLAG] :Stripple = ["-- ", "-", "--"]
        ;[Data.SY_DATA] :Stripple = ["=", "", ","]
    },
) {

}
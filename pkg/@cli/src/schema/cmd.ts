import {
    Int,
} from "@beyond-life/lowbar"

// ~~~

// Command Interface:
export interface Cmd {
    [key :string] :Data.Ty.Uq

    [Cmd.SUB_CMD_PREAMBLE] :string[]
}

export namespace Cmd {
    export const DASH_DASH :unique symbol =
        Symbol("<`--` sequence switch>")

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
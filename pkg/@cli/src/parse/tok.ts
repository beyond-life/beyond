import {
    Int, isInt,
    isStr, areStr,
    till, range,
} from "@beyond-life/lowbar"

import {Latin} from "../char-pois"

import preparse from "./pre"

// ~~~

export default function tok(
    argsG :(string | Int[])[],
) {
    const args = areStr(argsG)
        ? argsG.map((arg :string) :Int[] =>
            [...arg].map((poiStr :string) =>
                poiStr.charCodeAt(0) as Int
            )
        )
        : argsG as Int[][]

    args.map(preparse)
}
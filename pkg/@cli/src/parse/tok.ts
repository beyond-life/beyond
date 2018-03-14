import {
    Int, isInt,
    isStr, areStr,
    till, range,
} from "@beyond-life/lowbar"

import {Latin} from "../char-pois"

// ~~~

export default function unesc(
    argsG :(string | Int[])[],
) {
    const args = areStr(argsG)
        ? argsG.map((arg :string) :Int[] =>
            [...arg].map((poiStr :string) =>
                poiStr.charCodeAt(0) as Int
            )
        )
        : argsG as Int[][]
}
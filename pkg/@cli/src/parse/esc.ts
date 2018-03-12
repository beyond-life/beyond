import {
    Int, isInt,
    isStr,
    till, range,
} from "@beyond-life/lowbar"

// ~~~

export default function unesc(
    argsG :string | Int[]
) {
    const args = isStr(argsG)
        ? [...argsG].map((poiStr) => poiStr.charCodeAt(0))
        : argsG
}
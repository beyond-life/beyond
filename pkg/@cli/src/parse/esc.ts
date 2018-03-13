import {
    Int, isInt,
    isStr,
    till, range,
} from "@beyond-life/lowbar"

import Pois from "../char-pois"

// ~~~

export default function unesc(
    argsG :string | Int[],
) {
    const args :Int[] = isStr(argsG)
        ? [...argsG].map((poiStr) => poiStr.charCodeAt(0) as Int)
        : argsG
    
    const bkSlashIs = args.filter((e) =>
        Pois.BK_SLASH === e
    ).map((e, i) =>
        i as Int
    )
}
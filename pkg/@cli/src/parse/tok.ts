import {
    Int, isInt,
    isStr, areStr, fromPoi,
    till, range,
    log,
} from "@beyond-life/lowbar"

import {Latin} from "../char-pois"

import {
    State,
    Env,
} from "./env"

import {
    parse,
} from "./pre"

// ~~~

export function *flowOver(
    tail :Int[],
    state :State,
) {
    let [env, overflow] = [state, tail]
    do {
        log(0o5)``
        env = parse(overflow, env)
        yield env
        ;({overflow} = env)
    } while (overflow.length)
}

export default function tokenize(
    argsG :(string | Int[])[],
) {
    const args = areStr(argsG)
        ? argsG.map((arg :string) :Int[] =>
            [...arg].map((poiStr :string) =>
                poiStr.charCodeAt(0) as Int
            )
        )
        : argsG as Int[][]
    const toks = args.reduce(
        (l :State[], r :Int[]) :State[] =>
            [
                ...l,
                ...flowOver(r, l[l.length-1])
            ],
        [new State.Bluepr()] as State[],
    )
}
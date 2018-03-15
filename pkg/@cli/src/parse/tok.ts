import {
    Int, isInt,
    isStr, areStr, fromPoi,
    proto,
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
    state1st :State,
) {
    let [state, overflow] = [state1st, tail]
    do {
        const {flagKind, dataKind} = state
        const env = {
            flagKind, dataKind,
        }
        log(0o5)`= Parsin ${overflow} in ${env}`

        state = parse(overflow, env)
        yield state

        ;({overflow} = state)
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
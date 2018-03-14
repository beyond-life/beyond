const fromPoi = String.fromCodePoint

// @@@

import {
    Int, isInt,
    Prop,
    isStr,
    till, range,
} from "@beyond-life/lowbar"

import {Latin} from "../char-pois"

import {
    Data,
    Ty,
} from "../schema/data"
import {
    AUTOM,
    Flag,
    SyxForm,
} from "../schema/flag"
import {Cmd} from "../schema/cmd"

import {
    FlagTy,
    Bluepr as EnvBluepr,
    default as Env,
} from "./env"

// ~~~

function recogKind<
      Kind extends symbol>(
    tail :string,
    delims :Int[][],
    kinds :Kind[],
) :[Kind, Int] | null {
    const dLengths = delims.map((e, i) =>
        [i, e] as [Int, Int[]]
    ).sort((l, r) =>
        r[1].length - l[1].length
    )
    const [i, len] = dLengths.reduce((
        l :[Int, Int] | [null, null],
        [kindI, curDelim] :[Int, Int[]],
        i :number,
    ) :[Int, Int] | [null, null] => {
        if (null !== l[0]) {
            const matDelim = delims[l[0]!]
            console.log(
                `\n$  Matched delim: <<${fromPoi(...matDelim)}>> (${l[0]})`,
            )
            return l
        }

        console.log("\n$  Testing delim: <<" + curDelim + ">>")
        if (!tail.startsWith(fromPoi(...curDelim)))
            return [null, null]

        const curLen = curDelim.length as Int

        return [kindI, curLen]
    }, [null, null])

    return i && len && [kinds[i], len]
}

function recogFlag(
    tail :string,
    env :Env,
) :[FlagTy.Uq, Int] | null {
    if (env.flagTy === FlagTy.SHORT) {
        const poi = tail.codePointAt(0)

        return [FlagTy.SHORT, 0 as Int]
    }

    const {minus} = Latin.sign
    const kindRecog = recogKind(tail, [
        [minus[0]],
        ([] as Int[]).fill(minus[0], 0, 2),
    ], [
        FlagTy.SHORT,
        FlagTy.LONG,
    ])

    return kindRecog
}

function recogData(
    tail :string,
    env :Env,
) {

}

export default function preparse(
    args :string[],
) {
    const argStr = args.join("\n")
    const env = new EnvBluepr()

    const flagRecog = recogFlag(
        argStr,
        env,
    )

    if (null === flagRecog) {
        console.log("\n!  No flag recognized…")

        const dataRecog = recogData(
            argStr,
            env,
        )
    } else {
        console.log(
            `\n!  Flag recognized: ${flagRecog[0]}`
        )
    }
}
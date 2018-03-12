const {
    hasMetadata,
    getMetadata,
    defineMetadata: defMd,
} = Reflect

// @@@

import {
    Int, isInt,
    Prop,
    isStr,
} from "@beyond-life/lowbar"

import {
    Data,
    Ty,
} from "./schema/data"
import {
    SyxForm,
    AUTOM,
} from "./schema/flag"
const {INITIAL} = Data

// ~~~

export type PropDesc = PropertyDescriptor
export type PropDecor = (
    tgt :Object, //target
    prop :Prop, //property
    desc :PropertyDescriptor,
) => PropertyDescriptor 

export type Alias = string | typeof AUTOM
export function alias(
    aliG :Alias | Alias[],
    form :typeof SyxForm.SHORT,
) :PropDecor
export function alias(
    aliG :string[],
    form :typeof SyxForm.LONG,
) :PropDecor
export function alias(
    aliG :Alias | Alias[] = AUTOM,
    form :SyxForm.Uq = SyxForm.SHORT,
) {
    const isArr = Array.isArray
    const ali :Alias[] = SyxForm.SHORT === form
        ? isArr(aliG)
            ? aliG.map((a :Alias) :Alias =>
                isStr(a) ? [...a][0] : a
            ) as Alias[]
            //… Extractin first code point
        : isStr(aliG)
            ? [...aliG]
            : [aliG]

        //  when `aliG` is LONG form:
        : isArr(aliG)
            ? aliG
            : [aliG]

    return (tgt :Object, prop :Prop, desc :PropDesc) :PropDesc => {
        const oldAli = hasMetadata(form, tgt, prop)
            ? getMetadata(form, tgt, prop) as string[]
            : []
        const allAli = oldAli.concat(
            (ali.includes(AUTOM)
                ? ali
                    .filter((char :Alias) :boolean => AUTOM !== char)
                    .concat([
                        isStr(prop)
                            ? prop[0] //** automagic **
                            : (() => {
                                throw new Error("@alias: Magician died!")
                            })()
                    ])
                : ali
            ) as string[]
        )
        
        defMd(form, allAli, tgt, prop)

        return desc
    }
}

// sets default value:
export function inital<Init extends Ty.NativeVal>(
    init :Init | typeof AUTOM = AUTOM,
) :PropDecor {
    return (tgt :Object, prop :Prop, desc :PropDesc) :PropDesc => {
        defMd(
            INITIAL,
            AUTOM === init
                ? (()=> {switch ((tgt as {[keys :string] :Ty.Uq})[prop]) {
                    case Ty.STR:
                        return ""
                    case Ty.NUM:
                    case Ty.NUM_INT:
                        return 0
                    case Ty.BOOL:
                        return !!0
                    default:
                        throw new Error("@initial: Magician died!")
                }})()
                : init,
            tgt,
            prop,
        )
        
        return desc
    }
}
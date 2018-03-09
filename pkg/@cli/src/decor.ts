const {
    metadata: md,
    hasMetadata,
    getMetadata,
    defineMetadata,
} = Reflect

// @@@

import {
    Int,
    isInt,
    isStr,
} from "@beyond-life/lowbar"

import {
    SyxForm,
    AUTOM,
    Data,
} from "./schema"
const {
    Ty,
    INITIAL,
} = Data

// ~~~

export type PropDecor = (
    tgt :Object, //target)
    prop :string | symbol, //property
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

    return (tgt, prop, desc) :PropertyDescriptor => {
        const oldAli = hasMetadata(form, tgt, prop)
            ? getMetadata(form, tgt, prop) as string[]
            : []
        const allAli = oldAli.concat(ali.includes(AUTOM)
            ? ali
                .filter((char :Alias) :boolean => AUTOM !== char)
                .concat([
                    prop.toString()[0], //** automagic **
                ])
            : 
        )
        
        defineMetadata(form, allAli, tgt, prop)

        return desc
    }
}

// sets default value:
export function inital<Init extends Data.Ty.NativeVal>(
    init :Init,
) :PropertyDecorator {
    return md(INITIAL, init)
}
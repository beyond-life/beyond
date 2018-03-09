const {
    metadata: md,
    hasMetadata,
    getMetadata,
    defineMetadata,
} = Reflect

// @@@

import {
    SyxForm,
    AUTOM,
    Data,
} from "./schema"
const {Ty, INITIAL} = Data

// ~~~

export type PropDecor = (
    tgt :Object, //target
    prop :string | symbol, //property
    desc :PropertyDescriptor,
) => PropertyDescriptor 

export type AliasG = string | typeof AUTOM
export function alias(
    aliG :AliasG | AliasG[],
    form :typeof SyxForm.SHORT,
) :PropDecor
export function alias(
    aliG :string | string[],
    form :typeof SyxForm.LONG,
) :PropDecor
export function alias(
    aliG :AliasG | AliasG[] = AUTOM,
    form :SyxForm.Uq = SyxForm.SHORT,
) {
    const isArr = Array.isArray
    const ali :string[] = AUTOM === aliG
        ? []
        : SyxForm.SHORT === form
        ? isArr(aliG)
            ? aliG.map((char :string) :string => [...char][0])
            //… Extractin first code point
            : [...aliG]

        : isArr(aliG)
            ? aliG
            : [aliG]

    return (tgt, prop, desc) :PropertyDescriptor => {
        const oldAli = hasMetadata(form, tgt, prop)
            ? getMetadata(form, tgt, prop) as string[]
            : []
        const allAli = oldAli.concat(ali.includes(AUTOM)
            ? prop.toString()[0] //** automagic **
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
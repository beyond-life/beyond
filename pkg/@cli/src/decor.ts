import {
    SyxForm,
    INITIAL,
    AUTOM,
    DataTy,
} from "./schema"

// ~~~

const md = (Reflect as any)
    .metadata as (k :string | symbol, v: any)=> Function

export function alias(
    aliG :string[] | string | typeof AUTOM = AUTOM,
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

    if (1 > ali.length) return md(form, ali)

    return <
          Tgt extends Object>(
        tgt :Tgt, //target
        prop :string | symbol, //property
        desc :PropertyDescriptor,
    ) :PropertyDescriptor => {
        return desc
    }
}

// sets default value:
export function inital<Init extends DataTy.NativeVal>(
    init :Init,
) :PropertyDecorator {
    return md(INITIAL, init)
}
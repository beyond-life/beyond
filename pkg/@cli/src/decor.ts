import {
    SyxForm,
    FlagData,
} from "./schema"

// ~~~

export function alias(
    aliArg :string[] | string,
    form :SyxForm.Uq = SyxForm.SHORT,
) :PropertyDecorator {
    const isArr = Array.isArray
    const ali :string[] = SyxForm.SHORT === form
        ? isArr(aliArg)
        ? aliArg.map((char :string) :string => [...char][0])
        //… Extractin first code point
        : [...aliArg]

        : isArr(aliArg)
        ? aliArg
        : [aliArg]

    return (Reflect as any).metadata(form, ali)
}

// sets default value:
export function inital<Init>(
    init :Init,
) :PropertyDecorator {
    return (Reflect as any).metadata(FlagData.INITIAL_VAL, ali)
}
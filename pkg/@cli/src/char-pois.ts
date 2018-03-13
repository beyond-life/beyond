import {
    Int, isInt,
    isStr,
    till, range,
} from "@beyond-life/lowbar"

// ~~~

export namespace Latin {
    export const page = {
        feed: // line
            0x0a,
        return: // (Mac)
            0x0d,
    }

    export const white = {
        tab:
            0x09,
        space:
            0x20,
    }
    export const punc = {
        bang: // `!`
            0x21,
        quote: // `"`
            0x22,
        apostrophe:
            0x27,
    }
    export const sign = {
        hash: // `#`
            0x23,
        percent:
            0x25,
        ampersand: // `&`
            0x26,
    }

    export const letter = {
        dollar:
            0x24,
    }

    export const bracs = {
        parens_l:
            0x28,
        parens_r:
            0x29,
    }
/*
    asterisk: Kind.Sign
        | 0x2a,
    plus: Kind.Sign
        | 0x2b,

    comma: Kind.Punc
        | 0x2c,
    minus: Kind.Sign
        | 0x2d,
    dot: Kind.Punc
        | 0x2e,
    slash: Kind.Sign
        | 0x2f,

    digits_0: Kind.Num
        | 0x30,
    // …
    digits_n: Spr.Range
        | 0x39,
    colon: Kind.Punc
        | 0x3a,
    semicolon = Kind.Punc
        | 0x3b,

    angle_l = Kind.Angle // `<`
        | 0x3c,
    equal = Kind.Punc
        | 0x3d,
    angle_r = Kind.Angle
        | 0x3e,
    query = Kind.Punc
        | 0x3f,
    */
}
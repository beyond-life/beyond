import {
    Int, isInt,
    isStr,
    till, range,
} from "@beyond-life/lowbar"

// ~~~

export namespace Latin {
    export const page = {
        feed: // line
            [0x0a],
        return: // (Mac)
            [0x0d],
    }

    export const white = {
        tab:
            [0x09],
        space:
            [0x20],
    }
    
    export const punc = {
        bang: // `!`
            [0x21],
        comma:
            [0x2c],
        dot:
            [0x2e],
        colon:
            [0x3a],
        semicolon:
            [0x3b],
        equal:
            [0x3d],
        query: // `?`
            [0x3f],
    }
    export const sign = {
        hash: // `#`
            [0x23],
        percent:
            [0x25],
        ampersand: // `&`
            [0x26],
        asterisk:
            [0x2a],
        plus:
            [0x2b],
        minus:
            [0x2d],
        slash:
            [0x2f, 0x5c],
        angle:
            [0x3c, 0x3e],
        // ---
        at:
            [0x40],
        pipe: //vertical bar
            [0x7c],
        tilde:
            [0x7e],
    }
    export const diacrit = {
        inch: // `"`
            [0x22],
        apostrophe:
            [0x27],
        // ---
        circumflex:
            [0x5e],
        grave:
            [0x60],
    }

    export const letter = {
        dollar:
            [0x24],
        // ---
        romanCap:
            [...till(range(0x41 as Int), 0x5a as Int)],
        lowLine:
            [0x5f],
        roman:
            [...till(range(0x61 as Int), 0x7a as Int)],
    }
    export const digit = {
        arabic:
            [...till(range(0x30 as Int), 0x39 as Int)],
    }

    export const brac = {
        parens:
            [0x28, 0x29],
        // ---
        bracket:
            [0x5b, 0x5d],
        brace:
            [0x7b, 0x7d],
    }
}
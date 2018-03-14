import {
    Int, isInt,
    isStr,
    till, range,
} from "@beyond-life/lowbar"

// ~~~

export namespace Latin {
    export const page = {
        feed: // line
            [0x0a] as Int[],
        return: // (Mac)
            [0x0d] as Int[],
    }

    export const white = {
        tab:
            [0x09] as Int[],
        space:
            [0x20] as Int[],
    }
    
    export const punc = {
        bang: // `!`
            [0x21] as Int[],
        comma:
            [0x2c] as Int[],
        dot:
            [0x2e] as Int[],
        colon:
            [0x3a] as Int[],
        semicolon:
            [0x3b] as Int[],
        query: // `?`
            [0x3f] as Int[],
    }
    export const sign = {
        hash: // `#`
            [0x23] as Int[],
        percent:
            [0x25] as Int[],
        ampersand: // `&`
            [0x26] as Int[],
        asterisk:
            [0x2a] as Int[],
        plus:
            [0x2b] as Int[],
        minus:
            [0x2d] as Int[],
        slash:
            [0x2f, 0x5c] as Int[],
        angle:
            [0x3c, 0x3e] as Int[],
        equal:
            [0x3d] as Int[],
        // ---
        at:
            [0x40] as Int[],
        pipe: //vertical bar
            [0x7c] as Int[],
        tilde:
            [0x7e] as Int[],
    }
    export const diacrit = {
        inch: // `"`
            [0x22] as Int[],
        apostrophe:
            [0x27] as Int[],
        // ---
        circumflex:
            [0x5e] as Int[],
        grave:
            [0x60] as Int[],
    }

    export const letter = {
        dollar:
            [0x24] as Int[],
        // ---
        romanCap:
            [...till(range(0x41 as Int), 0x5a as Int)] as Int[],
        lowLine:
            [0x5f] as Int[],
        roman:
            [...till(range(0x61 as Int), 0x7a as Int)] as Int[],
    }
    export const digit = {
        arabic:
            [...till(range(0x30 as Int), 0x39 as Int)] as Int[],
    }

    export const brac = {
        parens:
            [0x28, 0x29] as Int[],
        // ---
        bracket:
            [0x5b, 0x5d] as Int[],
        brace:
            [0x7b, 0x7d] as Int[],
    }
}
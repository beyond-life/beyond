import {
    default as exec,
    TT_STROKES,
} from "./exec"

process.stderr.write("> Executin `beyond` with default options…")
exec(process.stdin, process.stdout, {
    format: TT_STROKES,
})
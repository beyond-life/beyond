import exec from "./exec"

process.stderr.write("> Executin `beyond` with default options…")
exec(process.stdin, process.stdout)
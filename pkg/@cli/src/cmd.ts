import {log} from "@beyond-life/lowbar"

import tokenize from "./parse/tok"

// ~~~

log(0o0)`READING`
const av = process.argv.slice(2)
for (let a of av) log(0o7)`${a}`

log(0o0)`TOKENIZE`
tokenize(av)
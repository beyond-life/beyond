import preparse from "./preparse"

process.stderr.write("\n> Reading following options:")
const av = process.argv.slice(2)
for (let a of av) process.stdout.write("\n* " + a)
preparse(av)
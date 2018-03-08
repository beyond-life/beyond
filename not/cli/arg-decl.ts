class MetaCmd extends Cmd {
    [Cmd.SUB_CMD]: string[] = []

    @alias("v") @def(false) version = BOOL
    @alias("h") @def(false) help = BOOL
}
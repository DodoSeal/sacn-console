function parse(cmd) {
    let addresses = {};
    let args = cmd.split(" ");
    let value = args[args.length - 1];
    
    for(let i = 0; i<=args.length - 1; i++) {
        let arg = args[i];

        if (parseInt(arg) && i != args.length-1) {
            addresses[arg] = value;
        } else if (arg == "Thru") {
            let argBefore = args[i - 1];
            let argAfter = args[i+1];

            for(let num = argBefore; num<=argAfter; num++) {
                addresses[num] = value;
            };
        };
    };

    return addresses;
};

module.exports = { parse };
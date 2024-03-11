// Start Streaming DMX Values
if (window.app) {
    sendDMX({});
};

const cmdBar = document.getElementById('cmd-bar');
const keypad = [
    document.getElementById('key-thru'),
    document.getElementById('key-space'),
    document.getElementById('key-clear'),
    document.getElementById('key-1'),
    document.getElementById('key-2'),
    document.getElementById('key-3'),
    document.getElementById('key-4'),
    document.getElementById('key-5'),
    document.getElementById('key-6'),
    document.getElementById('key-7'),
    document.getElementById('key-8'),
    document.getElementById('key-9'),
    document.getElementById('key-at'),
    document.getElementById('key-0'),
    document.getElementById('key-enter')
];

let payload = {};

document.addEventListener('keypress', (event) => {
    let key = event.key;

    switch(key) {
        case "c":
            keypad[2].click();
            break;
        case "t":
            keypad[0].click();
            break;
        case "1":
            keypad[3].click();
            break;
        case "2":
            keypad[4].click();
            break;
        case "3":
            keypad[5].click();
            break;
        case "4":
            keypad[6].click();
            break;
        case "5":
            keypad[7].click();
            break;
        case "6":
            keypad[8].click();
            break;
        case "7":
            keypad[9].click();
            break;
        case "8":
            keypad[10].click();
            break;
        case "9":
            keypad[11].click();
            break;
        case "0":
            keypad[13].click();
            break;
        case "@":
            keypad[12].click();
            break;
        case " ":
            keypad[1].click();
            break;
        case "Enter":
            keypad[14].click();
            break;
    };
});

for (let key of keypad) {
    key.addEventListener('click', (event) => {
        switch(key.getAttribute('value')) {
            case "Space":
                if (cmdBar.value == "") return;

                cmdBar.value += " ";
                break;
            case "Clear":
                cmdBar.value = "";
                break;
            case "Enter":
                if (cmdBar.value == "") return;
                
                parse(cmdBar.value);

                cmdBar.value += "*";
                sendDMX(payload);
                payload = {};
                break;
            case "At":
                if (cmdBar.value == "") return;
                if (!cmdBar.value.endsWith(" ")) return;
                break;
            case "Thru":
                if (cmdBar.value == "") return;
                if (!cmdBar.value.endsWith(" ")) return;
                break;
        };

        if (key.value == "Space" || key.value == "Enter" || key.value == "Clear") return;
        /* if (cmdBar.value.endsWith("u") || cmdBar.value.endsWith("t")) {
            keypad[1].click();
        }; */
        if (cmdBar.value.includes("*")) {
            cmdBar.value = "";
        };

        cmdBar.value += key.value;
    });
};

function sendDMX(data) {
    console.log("Sending DMX: ", data);
    window.app.send(data);
};

function sendOsc(data) {
    console.log("Sending OSC: ", data);
    window.app.sendOsc(data);
};

function parse(cmd) {
    let args = cmd.split(" ");
    let value = args[args.length - 1];

    if (value > 100) {
        value = 100;
    };

    for (let i = 0; i <= args.length - 1; i++) {
        let arg = args[i];

        if (parseInt(arg) && i != args.length - 1) {
            payload[arg] = value;
        } else if (arg == "Thru") {
            let argBefore = args[i - 1];
            let argAfter = args[i + 1];

            for (let num = argBefore; num <= argAfter; num++) {
                payload[num] = value;
            };
        };
    };
};

window.sendDMX = sendDMX;
window.sendOsc = sendOsc;
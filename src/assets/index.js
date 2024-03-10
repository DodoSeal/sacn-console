// Start Streaming DMX Values
sendDMX({});

const cmdBar = document.getElementById('cmd-bar');
const keypad = [
    document.getElementById('key-thru'),
    document.getElementById('key-off'),
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

for (let key of keypad) {
    key.addEventListener('click', (event) => {
        switch(key.getAttribute('value')) {
            case "Off":
                sendDMX({});
                break;
            case "Clear":
                cmdBar.value = "";
                break;
            case "Enter":
                if (cmdBar.value == "") return;
                
                cmdBar.value += "*";
                sendDMX(payload);
                payload = {};
                break;
        };

        if (key.value == "Off" || key.value == "Enter" || key.value == "Clear") return;

        if (cmdBar.value == "") {
            
        } else {
            
        };
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

window.sendOsc = sendOsc;
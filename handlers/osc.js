const { Client } = require('node-osc');

function send(ip, port, message) {
    if (ip == null || port == null || message == null) return console.warn("No IP, Port, or Message | OSC Handler");

    const client = new Client(ip, port);

    client.send(message, 200, () => {
        client.close();
    });
};

module.exports = { send };
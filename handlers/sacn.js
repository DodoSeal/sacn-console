const { AsyncLocalStorage } = require('async_hooks');
const { Sender } = require('sacn');

const server = new Sender({
    universe: 1,
    minRefreshRate: 1
});

async function send(data) {
    await server.send({
        payload: data,
        sourceName: "sACN Console",
        priority: 150
    });
};

function closeServer() {
    server.close();
};

module.exports = { send, closeServer };
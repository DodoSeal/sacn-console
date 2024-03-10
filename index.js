const { app, BrowserWindow, ipcMain, net } = require('electron');
const path = require('path');
const sacn = require('./handlers/sacn');
const network = require('./handlers/network-scan');
const oscHandler = require('./handlers/osc');

let eosConsole;

const createWindow = async () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    win.loadFile('src/index.html');

    const device = await network.findEos();
    eosConsole = {
        ip: device.Address,
        name: device.Name
    };

    console.log("Found Eos Console: ", eosConsole);
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length == 0) {
            createWindow();
        };
    });
});

app.on('window-all-closed', () => {
    sacn.closeServer();
    app.quit();
});

ipcMain.on('send', (_event, message) => {
    sacn.send(message);
});

ipcMain.on('sendOsc', (_event, message) => {
    if (eosConsole == null) return console.log("No Eos Console to communicate with.");

    oscHandler.send(eosConsole.ip, 8000, `/eos${message}`);
});
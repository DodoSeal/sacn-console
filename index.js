const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    win.loadFile('src/index.html');
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
    app.quit();
});

const sacn = require('./handlers/sacn');

ipcMain.on('send', (_event, message) => {
    sacn.send(message);
});
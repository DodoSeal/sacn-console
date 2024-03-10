const { contextBridge, ipcRenderer } = require(`electron`);

contextBridge.exposeInMainWorld(`app`, {
    send: (dmx) => ipcRenderer.send(`send`, dmx),
    sendOsc: (message) => ipcRenderer.send(`sendOsc`, message)
});
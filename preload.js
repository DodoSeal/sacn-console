const { contextBridge, ipcRenderer } = require(`electron`);

contextBridge.exposeInMainWorld(`app`, {
    send: (dmx) => ipcRenderer.send(`send`, dmx),
    sendOsc: (message) => ipcRenderer.send(`sendOsc`, message),
    writePreset: (id, data) => ipcRenderer.send(`writePreset`, {id, data})
});
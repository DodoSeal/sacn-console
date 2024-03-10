const { contextBridge, ipcRenderer } = require(`electron`);

contextBridge.exposeInMainWorld(`sacn`, {
    send: (dmx) => ipcRenderer.send(`send`, dmx)
});
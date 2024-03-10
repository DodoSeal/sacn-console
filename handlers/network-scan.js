const { NetworkDevicesScannerAPI } = require('@juliendu11/network-devices-scanner-api');
const fs = require('fs');

const instance = new NetworkDevicesScannerAPI();
const connections = instance.findConnections();
const wifiConnection = connections[0];

async function findEos() {
    let devices = await instance.findDevices(wifiConnection);
    let eosConsole;
    let bigString = "";
    
    for(let device of devices) {
        bigString += `${device.Address} | ${device.Name}\n`;

        if (device.Name.includes("DESKTOP-")) {
            eosConsole = device;
        };
    };

    fs.writeFileSync('./network.txt', bigString);
    return eosConsole;
};

module.exports = { findEos };
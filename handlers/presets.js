const fs = require('fs');
const path = require('path');
const presetFolderPath = (path.join(__dirname, '../presets') + "/").replace('/sacn-console.app/Contents/Resources/app.asar', '');

function recall(number) {
    checkPresetDir();
    let file;

    let searchQuery = `preset-${number}.json`;
    file = fs.readFileSync(presetFolderPath + searchQuery, "utf-8");

    if (!file) return { message: "No Preset Found" };

    return JSON.parse(file);
};

function store(number, data) {
    checkPresetDir();
    let fileName = `preset-${number}.json`;
    let presetFolder = fs.readdirSync(presetFolderPath);
    data = JSON.stringify(data);

    if (presetFolder.includes(fileName)) {
        console.log('Overwriting Preset ' + number);
    };

    fs.writeFileSync(presetFolderPath + fileName, data);
};

function checkPresetDir() {
    let presetsDir = fs.existsSync(presetFolderPath);

    if (!presetsDir) {
        fs.mkdirSync(presetFolderPath);
    };

    return;
};

module.exports = { recall, store };
const fs = require('fs');

function recall(number) {
    let file;

    let searchQuery = `preset-${number}.json`;
    file = fs.readFileSync("./presets/" + searchQuery, "utf-8");

    return JSON.parse(file);
};

function store(number, data) {
    let fileName = `preset-${number}.json`;
    let presetFolder = fs.readdirSync('./presets');
    data = JSON.stringify(data);

    if (presetFolder.includes(fileName)) {
        console.log('Overwriting Preset ' + number);
    };

    fs.writeFileSync("./presets/" + fileName, data);
};

module.exports = { recall, store };
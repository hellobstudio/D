// Ha módosítod a tools/vocab_data.json fájlt, futtasd: node tools/json2data.js
const fs = require('fs'), path = require('path');
const d = JSON.parse(fs.readFileSync(path.join(__dirname, 'vocab_data.json'), 'utf8'));
fs.writeFileSync(path.join(__dirname, '..', 'www', 'data.js'), 'window.VOCAB=' + JSON.stringify(d) + ';');
console.log('www/data.js frissítve:', d.words.length, 'szó,', d.items.length, 'feladat');

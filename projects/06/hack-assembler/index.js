"use strict";

const fs = require('fs');

let file = fs.readFileSync(process.argv[2], 'utf8');
let progRaw = file.split('\n');
let prog = [];

for (let i = 0; i < progRaw.length; i++) {

    // Remove spaces
    let line = progRaw[i].replace(/\s/g, '');

    // Skip blank lines
    if (line.length == 0) {
        continue;
    }

    // Remove comments
    let commentIndex = line.indexOf('//');
    switch(commentIndex) {
        case 0:
            break;
        case -1:
            prog.push(line);
            break;
        default:
            prog.push(line.substring(0, line.indexOf('//')));
            break;
    }
}

for (let i = 0; i < prog.length; i++) {

    let line = prog[i];
    console.log(`${i}\t${line}`);
}
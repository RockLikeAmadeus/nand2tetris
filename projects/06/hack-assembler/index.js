"use strict";

const fs = require('fs');
const cleaner = require('./cleaner');

// Read the file in
let file = fs.readFileSync(process.argv[2], 'utf8');
// Convert it into an array
let progRaw = file.split('\n');
// Clean white space and comments from the program
let prog = cleaner(progRaw);

for (let i = 0; i < prog.length; i++) {

    let line = prog[i];
    console.log(`${i}\t${line}`);
}
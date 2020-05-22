"use strict";

const fs = require('fs');
const clean = require('./cleaner');

// Read the file in
let file = fs.readFileSync(process.argv[2], 'utf8');
let progRaw = file.split('\n');

console.log('Original program:\n');
printProgram(progRaw);
printSeparator();

///////////////////////////////////////////////////////////////////////////////

function printSeparator() {
    console.log('\n////////////////////////\n');
}

function printProgram(prog) {
    for (let i = 0; i < prog.length; i++) {

        let line = prog[i];
        console.log(`${i}\t${line}`);
    }
}

// Clean white space and comments from the program
let prog = clean(progRaw);

console.log('Without white space or comments:\n');
printProgram(prog);
printSeparator();
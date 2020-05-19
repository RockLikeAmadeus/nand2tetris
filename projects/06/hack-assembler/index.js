"use strict";

const fs = require('fs');
const clean = require('./cleaner');
const unlabel = require('./label-converter');
const translate = require('./translator');

// Read the file in
let file = fs.readFileSync(process.argv[2], 'utf8');
// Convert it into an array
let progRaw = file.split('\n');

console.log('Original program:\n');
printProgram(progRaw);
printSeparator();

// Clean white space and comments from the program
let prog = clean(progRaw);

console.log('Without white space or comments:\n');
printProgram(prog);
printSeparator();

// Remove all symbols from the program
prog = unlabel(prog);

console.log('Without symbols:\n');
printProgram(prog);
printSeparator();

// Translate un-labeled assembler code to HACK machine language
prog = translate(prog);

console.log('HACK machine language:\n');
printProgram(prog);
printSeparator();

// Write assembled program to file
fs.writeFile(
    `${process.argv[2].substring(0, process.argv[2].length-3)}hack`,
    prog.join('\n'),
    (err) => {
        if (err) return console.log(err);
        console.log('Assembly succeeded.');
        printSeparator();
    });




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
"use strict";

const fs = require('fs');
const clean = require('./cleaner');
const translate = require('./translator');
const printer = require('./printer');

// Read the file in
let file = fs.readFileSync(process.argv[2], 'utf8');
let progRaw = file.split('\n');

console.log('Original program:\n');
printer.printProgram(progRaw);
printer.printSeparator();

// Clean white space and comments from the program
let prog = clean(progRaw);

console.log('Without white space or comments:\n');
printer.printProgram(prog);
printer.printSeparator();
printer.printSeparator();

// Translate VM Code
prog = translate(prog);
printer.printProgram(prog);

// Write translated program to file
fs.writeFile(
    `${process.argv[2].substring(0, process.argv[2].length-2)}asm`,
    prog.join('\n'),
    (err) => {
        if (err) return console.log(err);
        printer.printSeparator();
        console.log('Translation succeeded.');
        printer.printSeparator();
    });
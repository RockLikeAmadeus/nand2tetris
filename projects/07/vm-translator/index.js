"use strict";

const fs = require('fs');
const clean = require('./cleaner');
const translate = require('./translator');
const printer = require('./printer');

// Read the file in
const fileName = process.argv[2]
let file = fs.readFileSync(fileName, 'utf8');
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
prog = translate(fileName, prog);
printer.printProgram(prog);

// Write translated program to file
fs.writeFile(
    `${fileName.substring(0, fileName.length-2)}asm`,
    prog.join('\n'),
    (err) => {
        if (err) return console.log(err);
        printer.printSeparator();
        console.log('Translation succeeded.');
        printer.printSeparator();
    });
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

// Translate VM Code
translate(prog);
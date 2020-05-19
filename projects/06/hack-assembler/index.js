"use strict";

const fs = require('fs');
const cleaner = require('./cleaner');
const translate = require('./translator');

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

console.log('');
console.log('////////////////////////');
console.log('');


prog = translate(prog);


// Write assembled program to file
fs.writeFile(
    `${process.argv[2].substring(0, process.argv[2].length-3)}hack`,
    prog.join('\n'),
    (err) => {
        if (err) return console.log(err);
        console.log('Translation success');
    });

for (let i = 0; i < prog.length; i++) {

    let line = prog[i];
    console.log(`${i}\t${line}`);
}
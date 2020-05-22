"use strict";

const fs = require('fs');
const clean = require('./cleaner');

// Read the file in
let file = fs.readFileSync(process.argv[2], 'utf8');
let progRaw = file.split('\n');

console.log('Original program:\n');
printProgram(progRaw);
printSeparator();

// Clean white space and comments from the program
let prog = clean(progRaw);

console.log('Without white space or comments:\n');
printProgram(prog);
printSeparator();

// Translate VM Code
translate(prog);

function translate(prog) {

    let result = [];

    // For each line in the file
    for (let i = 0; i < prog.length; i++) {

        const line = prog[i];
        result.push(`// ${line}`)

        const terms = line.split(' ');

        const command = terms[0];

        if (terms.length == 3) {

            const segment = terms[1];
            const argument = terms[2];

            // Memory access command
            switch(command) {
                case 'push':
                    console.log('push!');
                    break;
        }
        } else if (terms.length == 1) {
            // Arithmetic / Logic command
        }

        

    }

    printProgram(result);

}








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
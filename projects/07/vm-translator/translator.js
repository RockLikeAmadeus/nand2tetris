"use strict";

const printer = require('./printer')

module.exports = function translate(prog) {

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
                    switch(segment) {
                        case 'constant':
                            console.log("push constant!")
                            break;
                    }
                    break;
                case 'pop':
                    console.log('pop!');
                    break;
            }

        } else if (terms.length == 1) {
            // Arithmetic / Logic command
        }

        

    }

    printer.printProgram(result);

}
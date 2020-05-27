"use strict";

const printer = require('./printer')

module.exports = function translate(prog) {

    let result = [];

    // For each line in the file
    for (let i = 0; i < prog.length; i++) {

        const line = prog[i];
        result.push(`// ${line}`)

        const terms = line.split(' ');

        const command = terms[0].trim();

        if (terms.length == 3) {

            const segment = terms[1].trim();
            const argument = terms[2].trim();

            // Memory access command
            switch(command) {
                case 'push':
                    switch(segment) {
                        case 'constant':
                            result = result.concat(pushValue(argument));
                            break;
                    }
                    break;
                case 'pop':
                    console.log('pop!');
                    break;
            }

        } else if (terms.length == 1) {
            // Arithmetic / Logic command
            switch(command) {
                case 'add':
                    result = result.concat(add());
                    break;
            }
        }
    }

    printer.printProgram(result);
}

// Returns an array containing the hack instructions necessary
// to push a constant value onto the stack
function pushValue(val) {
    let hackInstructions = [];
    // D = val
    hackInstructions.push(`@${val}`);
    hackInstructions.push('D=A');
    // *SP = D; SP++;
    hackInstructions = hackInstructions.concat(pushDRegister());
    return hackInstructions;
}

function pushDRegister() {
    let hackInstructions = [];
    // *SP = D
    hackInstructions.push('@SP');
    hackInstructions.push('A=M');
    hackInstructions.push('M=D');
    // SP++
    hackInstructions.push('@SP');
    hackInstructions.push('M=M+1');
    return hackInstructions;
}

// Returns an array containing the hack instructions necessary
// to add the top two values in the stack
function add() {
    let hackInstructions = [];
    // SP--
    hackInstructions.push('@SP');
    hackInstructions.push('M=M-1');
    // D = *SP
    hackInstructions.push('@SP');
    hackInstructions.push('A=M');
    hackInstructions.push('D=M');
    // SP--
    hackInstructions.push('@SP');
    hackInstructions.push('M=M-1');
    // D = D + *SP
    hackInstructions.push('@SP');
    hackInstructions.push('A=M');
    hackInstructions.push('D=D+M');
    // *SP = D; SP++;
    hackInstructions = hackInstructions.concat(pushDRegister());
    return hackInstructions;
}
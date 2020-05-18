// Converts a .asm file without comments, white space, or labels into HACK
// machine language

"use strict";

module.exports = function(prog) {

    let result = [];

    for (let i = 0; i < prog.length; i++) {

        let line = prog[i];

        if (line[0] == '@') {
            result.push(translateAInstruction(line));
        }
        else {
            result.push(translateCInstruction(line));
        }

    }

    return result;
}

function translateAInstruction(ins) {
    // Prefix:
    let machineInstruction = '0';

    // Convert value to binary
    let numString = ins.substring(1, ins.length);
    let binString = (+numString).toString(2); 
    // Pad zeros
    let binStringFull = `${'0'.repeat(15 - binString.length)}${binString}`;

    machineInstruction += binStringFull;

    return machineInstruction;
}

function translateCInstruction(ins) {
    // Prefix:
    let machineInstruction = '111';
    return machineInstruction;
}
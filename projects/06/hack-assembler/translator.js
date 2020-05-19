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

    // Parse instruction
    let destEnd = ins.indexOf('=');
    let jumpStart = ins.indexOf(';');
    let dest = destEnd > 0 ? ins.substring(0, destEnd) : '';
    let comp = destEnd > 0 
        ? ins.substring(destEnd+1, ins.length)
        : ins.substring(0, ins.length);
    comp = jumpStart != -1
        ? comp.substring(0, comp.indexOf(';'))
        : comp.substring(0, comp.length);
    let jump = jumpStart != -1
        ? ins.substring(jumpStart+1, ins.length)
        : '';

    // Translate fields
    machineInstruction +=
        translateComp(comp) +
        translateDest(dest) +
        translateJump(jump);
    


    return machineInstruction;
}

function translateDest(dest) {
    switch (dest) {
        case 'M':
            return '001';
        case 'D':
            return '010';
        case 'MD':
            return '011';
        case 'A':
            return '100';
        case 'AM':
            return '101';
        case 'AD':
            return '110';
        case 'AMD':
            return '111';
        default:
            return '000';
    }
}
function translateComp(comp) {
    switch (comp) {
        case '0':
            return '0101010';
        case '1':
            return '0111111';
        case '-1':
            return '0111010';
        case 'D':
            return '0001100';
        case 'A':
            return '0110000';
        case '!D':
            return '0001101';
        case '!A':
            return '0110001';
        case '-D':
            return '0001111';
        case '-A':
            return '0110011';
        case 'D+1':
            return '0011111';
        case 'A+1':
            return '0110111';
        case 'D-1':
            return '0001110';
        case 'A-1':
            return '0110010';
        case 'D+A':
            return '0000010';
        case 'D-A':
            return '0010011';
        case 'A-D':
            return '0000111';
        case 'D&A':
            return '0000000';
        case 'D|A':
            return '0010101';
        case 'M':
            return '1110000';
        case '!M':
            return '1110001';
        case '-M':
            return '1110011';
        case 'M+1':
            return '1110111';
        case 'M-1':
            return '1110010';
        case 'D+M':
            return '1000010';
        case 'D-M':
            return '1010011';
        case 'M-D':
            return '1000111';
        case 'D&M':
            return '1000000';
        case 'D|M':
            return '1010101';
        default:
            return '';
    }
}
function translateJump(jump) {
    switch (jump) {
        case 'JGT':
            return '001';
        case 'JEQ':
            return '010';
        case 'JGE':
            return '011';
        case 'JLT':
            return '100';
        case 'JNE':
            return '101';
        case 'JLE':
            return '110';
        case 'JMP':
            return '111';
        default:
            return '000';
    }
}
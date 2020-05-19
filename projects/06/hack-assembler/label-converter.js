// Converts a .asm file without comments or white space into HACK
// an identical file without labels

"use strict";

// Set up built-in symbols
const symbols = {
    'SP': '0',
    'LCL': '1',
    'ARG': '2',
    'THIS': '3',
    'THAT': '4',
    'R0': '0',
    'R1': '1',
    'R2': '2',
    'R3': '3',
    'R4': '4',
    'R5': '5',
    'R6': '6',
    'R7': '7',
    'R8': '8',
    'R9': '9',
    'R10': '10',
    'R11': '11',
    'R12': '12',
    'R13': '13',
    'R14': '14',
    'R15': '15',
    'SCREEN': '16384',
    'KBD': '24576'
}

module.exports = function(prog) {
    
    let progNoLabels = [];
    let progNoSymbols = [];
    let numLabelsFound = 0;
    let currentVarAddress = 16; // Start variables at address 16

    // First pass: find and remove labels
    for (let i = 0; i < prog.length; i++) {

        let line = prog[i];
        if (line[0] == '(' && line[line.length-1] == ')') {
            symbols[line.substring(1, line.length-1)]
                = (i+numLabelsFound).toString();
            numLabelsFound++;
        }
        else {
            progNoLabels.push(line);
        }
    }

    // Second pass: find and replace variables
    for (let i = 0; i < progNoLabels.length; i++) {
        
        let line = progNoLabels[i];
        if (line[0] == '@' && isNaN(line.substring(1, line.length))) {
            // We found a variable reference
            let varName = line.substring(1, line.length);
            // Check if it exists in the symbol table already
            if (!symbols.hasOwnProperty(varName)) {
                symbols[varName] = currentVarAddress.toString();
                currentVarAddress++;
            }
            // Either way, replace it with its address value
            line = `@${symbols[varName]}`;
        }
        progNoSymbols.push(line);
    }

    return progNoSymbols;

}
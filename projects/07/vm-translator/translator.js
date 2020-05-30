"use strict";

const printer = require('./printer')
const LabelMaker = require('./label-maker');

module.exports = function translate(fileName, prog) {

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
                        case 'local':
                        case 'argument':
                        case 'this':
                        case 'that':
                            result = result.concat(
                                retrieveSegmentValueIntoD(
                                    segment, argument
                                ))
                            result = result.concat(pushDRegister());
                        case 'static':
                            result.push(`@${fileName}.${argument}`);
                            result.push('D=M');
                            result = result.concat(pushDRegister());
                            break;

                    }
                    break;
                case 'pop':
                    switch(segment) {
                        case 'local':
                        case 'argument':
                        case 'this':
                        case 'that':
                            result = result.concat(
                                loadFocusPointer(segment, argument)
                            );
                            result = result.concat(popStackIntoDRegister());
                            result = result.concat(loadMemoryWithDRegister());
                            break;
                        case 'static':
                            result = result.concat(popStackIntoDRegister());
                            result.push(`@${fileName}.${argument}`);
                            result.push('M=D');
                    }
                    break;
            }

        } else if (terms.length == 1) {
            // Arithmetic / Logic command
            switch(command) {
                // Handle binary operators
                case 'add':
                case 'sub':
                case 'eq':
                case 'gt':
                case 'lt':
                case 'and':
                case 'or':
                    result = result.concat(binaryOp(command));
                    break;
                // Handle unary operators
                case 'neg':
                case 'not':
                    result = result.concat(unaryOp(command));
                    break;
            }
        }
    }

    return result;
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

function retrieveSegmentValueIntoD(segment, argument) {
    let hackInstructions = [];
    let pointer = '';
    if (['local', 'argument', 'this', 'that'].includes(segment)) {
        switch(segment) {
            case 'local':
                pointer = 'LCL'
                break;
            case 'argument':
                pointer = 'ARG'
                break;
            case 'this':
                pointer = 'THIS'
                break;
            case 'that':
                pointer = 'THAT'
                break;
        }

        hackInstructions.push(`@${pointer}`);
        hackInstructions.push('D=M');
        hackInstructions.push(`@${argument}`);
        hackInstructions.push('D=D+A');
        hackInstructions.push('A=D');
        hackInstructions.push('D=M');
    }
    return hackInstructions;
}

// Loads D into the address pointed to by the variable focuspointer
function loadMemoryWithDRegister() {
    let hackInstructions = [];
    hackInstructions.push('@focuspointer');
    hackInstructions.push('A=M');
    hackInstructions.push('M=D');
    return hackInstructions;
}

// Loads a variable named focuspointer with the address of the specific value
// within a specfic memory segment which is the focus of this VM command
function loadFocusPointer(segment, argument) {
    let hackInstructions = [];
    let pointer = '';
    if (['local', 'argument', 'this', 'that'].includes(segment)) {
        switch(segment) {
            case 'local':
                pointer = 'LCL'
                break;
            case 'argument':
                pointer = 'ARG'
                break;
            case 'this':
                pointer = 'THIS'
                break;
            case 'that':
                pointer = 'THAT'
                break;
        }

        hackInstructions.push(`@${pointer}`);
        hackInstructions.push('D=M');
        hackInstructions.push(`@${argument}`);
        hackInstructions.push('D=D+A');
        hackInstructions.push('@focuspointer');
        hackInstructions.push('M=D');
    }
    return hackInstructions;
}

// Returns an array containing the hack instructions necessary
// to push the value of the D register onto the stack
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

function popStackIntoMRegister() {
    let hackInstructions = [];
    // SP--
    hackInstructions.push('@SP');
    hackInstructions.push('M=M-1');
    // M = *SP
    //hackInstructions.push('@SP');
    hackInstructions.push('A=M');
    return hackInstructions;
}

function popStackIntoDRegister() {
    // SP--; M = *SP;
    let hackInstructions = popStackIntoMRegister();
    // D = M
    hackInstructions.push('D=M');
    return hackInstructions;
}

function popStackIntoDAndMRegisters() {
    let hackInstructions = popStackIntoDRegister();
    hackInstructions = hackInstructions.concat(popStackIntoMRegister());
    return hackInstructions
}

// Returns an array containing the hack instructions necessary
// to perform a binary operation on the top two values in the stack
function binaryOp(operator) {
    if (!['add', 'sub', 'eq', 'gt', 'lt', 'and', 'or'].includes(operator)) {
        return [];
    }

    let hackInstructions = popStackIntoDAndMRegisters();

    switch(operator) {
        case 'add':
            hackInstructions.push('D=D+M');
            break;
        case 'sub':
            hackInstructions.push('D=M-D');
            break;
        case 'and':
            hackInstructions.push('D=D&M');
            break;
        case 'or':
            hackInstructions.push('D=D|M');
            break;
        case 'eq':
        case 'gt':
        case 'lt':
            hackInstructions = hackInstructions.concat(comparisonOp(operator));
            break;
    }
    
    // *SP = D; SP++;
    hackInstructions = hackInstructions.concat(pushDRegister());
    return hackInstructions;
}

function comparisonOp(operator) {
    const hackInstructions = []
    const location1 = LabelMaker.GetLabel();
    const end = LabelMaker.GetLabel();
    hackInstructions.push('D=M-D');
    hackInstructions.push(`@${location1}`);

    switch (operator) {
        case 'eq':
            hackInstructions.push('D;JEQ');
            break;
        case 'gt':
            hackInstructions.push('D;JGT');
            break;
        case 'lt':
            hackInstructions.push('D;JLT');
            break;
    }

    hackInstructions.push('D=0') // TRUE
    hackInstructions.push(`@${end}`)
    hackInstructions.push('0;JMP');
    hackInstructions.push(`(${location1})`);
    hackInstructions.push('D=-1') // FALSE
    hackInstructions.push(`(${end})`);
    return hackInstructions;
}

function unaryOp(operator) {
    if (!['neg', 'not'].includes(operator)) {
        return [];
    }

    let hackInstructions = popStackIntoDRegister();

    switch (operator) {
        case 'neg':
            hackInstructions.push('D=-D');
            break;
        case 'not':
            hackInstructions.push('D=!D');
            break;
    }
    
    // *SP = D; SP++;
    hackInstructions = hackInstructions.concat(pushDRegister());
    return hackInstructions;
}
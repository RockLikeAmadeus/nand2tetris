"use strict";


module.exports.printProgram = function(prog) {
    for (let i = 0; i < prog.length; i++) {

        let line = prog[i];
        console.log(`${i}\t${line}`);
    }
}

module.exports.printSeparator = function() {
    console.log('\n////////////////////////\n');
}
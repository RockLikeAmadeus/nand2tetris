// Takes a .asm file as an array of strings (separated by carriage returns) and
// returns an identical array of strings but with all white space and comments
// removed

"use strict";

module.exports = function(fileAsArray) {

    let prog = [];

    for (let i = 0; i < fileAsArray.length; i++) {

        // Remove spaces
        let line = fileAsArray[i].replace(/\s/g, '');

        // Skip blank lines
        if (line.length == 0) {
            continue;
        }

        // Remove comments
        let commentIndex = line.indexOf('//');
        switch (commentIndex) {
            case 0:
                break;
            case -1:
                prog.push(line);
                break;
            default:
                prog.push(line.substring(0, line.indexOf('//')));
                break;
        }
    }

    return prog;
}
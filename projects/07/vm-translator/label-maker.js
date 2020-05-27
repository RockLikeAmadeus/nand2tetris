// Defines a static class which is capable of outputing an endless
// stream of unique labels, to be used for JUMP statements

"use strict";

class LabelMaker {
    static index = 0;

    static GetLabel() {
        return `LOCATION_${this.index++}`;
    }
}

module.exports = LabelMaker;
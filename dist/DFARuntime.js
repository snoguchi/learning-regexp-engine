"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DFARuntime {
    constructor(dfa) {
        this.dfa = dfa;
        this.curState = dfa.start;
    }
    doTranstion(char) {
        this.curState = this.dfa.transition(this.curState, char);
    }
    isAcceptState() {
        return this.dfa.accepts.has(this.curState);
    }
    doesAccept(input) {
        for (const alphabet of input) {
            this.doTranstion(alphabet);
        }
        return this.isAcceptState();
    }
}
exports.default = DFARuntime;

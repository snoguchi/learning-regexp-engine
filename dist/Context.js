"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Context {
    constructor() {
        this.stateCount = 0;
    }
    newState() {
        this.stateCount++;
        return this.stateCount;
    }
}
exports.default = Context;

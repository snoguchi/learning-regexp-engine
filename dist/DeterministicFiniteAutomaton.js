"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DFARuntime_1 = __importDefault(require("./DFARuntime"));
class DeterministicFiniteAutomaton {
    constructor(transition, start, accepts) {
        this.transition = transition;
        this.start = start;
        this.accepts = accepts;
    }
    getRuntime() {
        return new DFARuntime_1.default(this);
    }
}
exports.default = DeterministicFiniteAutomaton;

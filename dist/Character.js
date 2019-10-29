"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NFAFragment_1 = __importDefault(require("./NFAFragment"));
class Character {
    constructor(char) {
        this.char = char;
    }
    assemble(context) {
        const frag = new NFAFragment_1.default();
        const s1 = context.newState();
        const s2 = context.newState();
        frag.connect(s1, this.char, s2);
        frag.start = s1;
        frag.accepts = new Set([s2]);
        return frag;
    }
}
exports.default = Character;

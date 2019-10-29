'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NondeterministicFiniteAutomaton_1 = __importDefault(require("./NondeterministicFiniteAutomaton"));
class NFAFragment {
    constructor() {
        this.start = null;
        this.accepts = null;
        this.map = new Map();
    }
    connect(from, char, to) {
        const key = JSON.stringify([from, char]);
        let slot = this.map.get(key);
        if (!slot) {
            this.map.set(key, (slot = new Set()));
        }
        slot.add(to);
    }
    newSkeleton() {
        // コピーして返す
        const newFrag = new NFAFragment();
        newFrag.map = new Map([...this.map]);
        return newFrag;
    }
    __or__(frag) {
        const newFrag = this.newSkeleton();
        for (const [k, v] of frag.map) {
            newFrag.map.set(k, new Set([...v]));
        }
        return newFrag;
    }
    build() {
        const transition = (state, char) => {
            const key = JSON.stringify([state, char]);
            return new Set(this.map.get(key));
        };
        return new NondeterministicFiniteAutomaton_1.default(transition, this.start, this.accepts);
    }
}
exports.default = NFAFragment;

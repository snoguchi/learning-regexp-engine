"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Star {
    constructor(operand) {
        this.operand = operand;
    }
    assemble(context) {
        const fragOrig = this.operand.assemble(context);
        const frag = fragOrig.newSkeleton();
        const s = context.newState();
        for (const state of fragOrig.accepts) {
            frag.connect(state, '', fragOrig.start);
        }
        frag.connect(s, '', fragOrig.start);
        frag.start = s;
        frag.accepts = new Set([...fragOrig.accepts, s]);
        return frag;
    }
}
exports.default = Star;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Union {
    constructor(operand1, operand2) {
        this.operand1 = operand1;
        this.operand2 = operand2;
    }
    assemble(context) {
        const frag1 = this.operand1.assemble(context);
        const frag2 = this.operand2.assemble(context);
        const frag = frag1.__or__(frag2);
        const s = context.newState();
        frag.connect(s, '', frag1.start);
        frag.connect(s, '', frag2.start);
        frag.start = s;
        frag.accepts = new Set([...frag1.accepts, ...frag2.accepts]);
        return frag;
    }
}
exports.default = Union;

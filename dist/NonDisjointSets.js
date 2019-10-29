"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NonDisjointSets extends Set {
    constructor(sub) {
        super();
        this.sub = sub;
    }
    has(aSet) {
        return [...this.sub].some(e => aSet.has(e));
    }
}
exports.default = NonDisjointSets;

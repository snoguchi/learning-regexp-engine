import Context from './Context';
import Node from './Node';
import NFAFragment from './NFAFragment';
export default class Star {
    private operand;
    constructor(operand: Node);
    assemble(context: Context): NFAFragment;
}

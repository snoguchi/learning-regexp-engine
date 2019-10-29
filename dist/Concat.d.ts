import NFAFragment from './NFAFragment';
import Node from './Node';
import Context from './Context';
export default class Concat implements Node {
    private operand1;
    private operand2;
    constructor(operand1: Node, operand2: Node);
    assemble(context: Context): NFAFragment;
}

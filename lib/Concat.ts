import { NFAState } from './NondeterministicFiniteAutomaton';
import NFAFragment from './NFAFragment';
import Node from './Node';
import Context from './Context';

export default class Concat implements Node {
  constructor(private operand1: Node, private operand2: Node) {}

  assemble(context: Context) {
    const frag1 = this.operand1.assemble(context);
    const frag2 = this.operand2.assemble(context);
    const frag = frag1.__or__(frag2);

    for (let state of frag1.accepts) {
      frag.connect(state, '', frag2.start);
    }

    frag.start = frag1.start;
    frag.accepts = frag2.accepts;

    return frag;
  }
}

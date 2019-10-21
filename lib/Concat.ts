import NFAFragment from './NFAFragment';
import Node from './Node';
import Context from './Context';

export default class Concat implements Node {
  constructor(private operand1: Node, private operand2: Node) {}

  assemble(context: Context): NFAFragment {
    const frag1: NFAFragment = this.operand1.assemble(context);
    const frag2: NFAFragment = this.operand2.assemble(context);
    const frag: NFAFragment = frag1.__or__(frag2);

    for (const state of frag1.accepts) {
      frag.connect(state, '', frag2.start);
    }

    frag.start = frag1.start;
    frag.accepts = frag2.accepts;

    return frag;
  }
}

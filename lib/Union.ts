import Node from './Node';
import NFAFragment from './NFAFragment';
import Context from './Context';

export default class Union implements Node {
  constructor(private operand1: Node, private operand2: Node) {}

  assemble(context: Context): NFAFragment {
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

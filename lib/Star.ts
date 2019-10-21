import Context from './Context';
import Node from './Node';
import NFAFragment from './NFAFragment';

export default class Star {
  constructor(private operand: Node) {}

  assemble(context: Context): NFAFragment {
    const fragOrig = this.operand.assemble(context);
    const frag = fragOrig.newSkeleton();
    const s = context.newState();

    for (let state of fragOrig.accepts) {
      frag.connect(state, '', fragOrig.start);
    }

    frag.connect(s, '', fragOrig.start);

    frag.start = s;
    frag.accepts = new Set([...fragOrig.accepts, s]);

    return frag;
  }
}

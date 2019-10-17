import { NFAState } from './NondeterministicFiniteAutomaton';
import NFAFragment from './NFAFragment';
import Node from './Node';
import Context from './Context';

class Character implements Node {
  constructor(private char: string) {}

  assemble(context: Context): NFAFragment {
    const frag = new NFAFragment();
    const s1: NFAState = context.newState();
    const s2: NFAState = context.newState();
    frag.connect(s1, this.char, s2);
    frag.start = s1;
    frag.accepts = new Set([s2]);
    return frag;
  }
}

export default Character;

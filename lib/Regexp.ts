import NondeterministicFiniteAutomaton, { NFAState } from './NondeterministicFiniteAutomaton';
import DeterministicFiniteAutomaton, { DFATransition } from './DeterministicFiniteAutomaton';
import NonDisjointSets from './NonDisjointSets';
import Lexer from './Lexer';
import Parser from './Parser';
import DFARuntime from './DFARuntime';

type DFAState = Set<NFAState>;

const nfa2dfa = (nfa: NondeterministicFiniteAutomaton): DeterministicFiniteAutomaton<DFAState> => {
  const transition: DFATransition<DFAState> = (set: DFAState, alpha: string) => {
    let ret: DFAState = new Set();
    for (let elem of set) {
      ret = new Set([...ret, ...nfa.transition(elem, alpha)]);
    }
    return nfa.epsilonExpand(ret);
  };

  const start: DFAState = nfa.epsilonExpand(new Set([nfa.start]));

  const accepts = new NonDisjointSets<NFAState>(nfa.accepts);

  return new DeterministicFiniteAutomaton<DFAState>(transition, start, accepts);
};

export default class Regexp {
  private dfa: DeterministicFiniteAutomaton<DFAState> = null;

  constructor(private regexp: string) {
    this.compile();
  }

  private compile(): void {
    const lexer = new Lexer(this.regexp);
    const parser = new Parser(lexer);
    const nfa: NondeterministicFiniteAutomaton = parser.expression();
    this.dfa = nfa2dfa(nfa);
  }

  matches(str: string): boolean {
    const runtime: DFARuntime<DFAState> = this.dfa.getRuntime();
    return runtime.doesAccept(str);
  }
}

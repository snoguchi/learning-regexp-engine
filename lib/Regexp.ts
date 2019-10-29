import NondeterministicFiniteAutomaton, { NFAState } from './NondeterministicFiniteAutomaton';
import DeterministicFiniteAutomaton, { DFATransition } from './DeterministicFiniteAutomaton';
import NonDisjointSets from './NonDisjointSets';
import Lexer from './Lexer';
import Context from './Context';
import Parser from './Parser';
import DFARuntime from './DFARuntime';
import NFAFragment from './NFAFragment';
import Node from './Node';

type DFAState = Set<NFAState>;

const nfa2dfa = (nfa: NondeterministicFiniteAutomaton): DeterministicFiniteAutomaton<DFAState> => {
  const transition: DFATransition<DFAState> = (set: DFAState, alpha: string) => {
    let ret: DFAState = new Set();
    for (const elem of set) {
      ret = new Set([...ret, ...nfa.transition(elem, alpha)]);
    }
    return nfa.epsilonExpand(ret);
  };

  const start: DFAState = nfa.epsilonExpand(new Set([nfa.start]));

  const accepts = new NonDisjointSets<NFAState>(nfa.accepts);

  return new DeterministicFiniteAutomaton<DFAState>(transition, start, accepts);
};

export default class Regexp {
  ast: Node = null;
  nfaFragment: NFAFragment = null;
  nfa: NondeterministicFiniteAutomaton = null;
  dfa: DeterministicFiniteAutomaton<DFAState> = null;

  constructor(private regexp: string) {
    this.compile();
  }

  private compile(): void {
    const lexer = new Lexer(this.regexp);
    const parser = new Parser(lexer);
    this.ast = parser.expression();
    this.nfaFragment = this.ast.assemble(new Context());
    this.nfa = this.nfaFragment.build();
    this.dfa = nfa2dfa(this.nfa);
  }

  matches(str: string): boolean {
    const runtime: DFARuntime<DFAState> = this.dfa.getRuntime();
    return runtime.doesAccept(str);
  }
}

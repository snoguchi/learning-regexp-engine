import DeterministicFiniteAutomaton from './DeterministicFiniteAutomaton';

export default class DFARuntime<DFAState> {
  curState: DFAState;

  constructor(private dfa: DeterministicFiniteAutomaton<DFAState>) {
    this.curState = dfa.start;
  }

  doTranstion(char: string): void {
    this.curState = this.dfa.transition(this.curState, char);
  }

  isAcceptState(): boolean {
    return this.dfa.accepts.has(this.curState);
  }

  doesAccept(input: string): boolean {
    for (const alphabet of input) {
      this.doTranstion(alphabet);
    }
    return this.isAcceptState();
  }
}

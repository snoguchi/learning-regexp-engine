import { NFAState } from './NondeterministicFiniteAutomaton';

export default class Context {
  private stateCount: number = 0;

  newState(): NFAState {
    this.stateCount++;
    return this.stateCount;
  }
}

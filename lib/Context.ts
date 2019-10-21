import { NFAState } from './NondeterministicFiniteAutomaton';

export default class Context {
  private stateCount = 0;

  newState(): NFAState {
    this.stateCount++;
    return this.stateCount;
  }
}

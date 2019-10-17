import DFARuntime from './DFARuntime';

export type DFATransition<DFAState> = (stat: DFAState, char: string) => DFAState;

export default class DeterministicFiniteAutomaton<DFAState> {
  constructor(public transition: DFATransition<DFAState>, public start: DFAState, public accepts: Set<DFAState>) {}

  getRuntime(): DFARuntime<DFAState> {
    return new DFARuntime(this);
  }
}

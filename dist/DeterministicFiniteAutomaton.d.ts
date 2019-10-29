import DFARuntime from './DFARuntime';
export declare type DFATransition<DFAState> = (stat: DFAState, char: string) => DFAState;
export default class DeterministicFiniteAutomaton<DFAState> {
    transition: DFATransition<DFAState>;
    start: DFAState;
    accepts: Set<DFAState>;
    constructor(transition: DFATransition<DFAState>, start: DFAState, accepts: Set<DFAState>);
    getRuntime(): DFARuntime<DFAState>;
}

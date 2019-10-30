import DeterministicFiniteAutomaton from './DeterministicFiniteAutomaton';
export default class DFARuntime<DFAState> {
    private dfa;
    curState: DFAState;
    constructor(dfa: DeterministicFiniteAutomaton<DFAState>);
    doTranstion(char: string): void;
    isAcceptState(): boolean;
    doesAccept(input: string): boolean;
}

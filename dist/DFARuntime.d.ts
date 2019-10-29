import DeterministicFiniteAutomaton from './DeterministicFiniteAutomaton';
export default class DFARuntime<DFAState> {
    private dfa;
    private curState;
    constructor(dfa: DeterministicFiniteAutomaton<DFAState>);
    doTranstion(char: string): void;
    isAcceptState(): boolean;
    doesAccept(input: string): boolean;
}

import NondeterministicFiniteAutomaton, { NFAState } from './NondeterministicFiniteAutomaton';
declare class NFAFragment {
    start: NFAState;
    accepts: Set<NFAState>;
    map: Map<string, Set<NFAState>>;
    connect(from: NFAState, char: string, to: NFAState): void;
    newSkeleton(): NFAFragment;
    __or__(frag: NFAFragment): NFAFragment;
    build(): NondeterministicFiniteAutomaton;
}
export default NFAFragment;

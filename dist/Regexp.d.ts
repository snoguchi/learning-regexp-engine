import NondeterministicFiniteAutomaton, { NFAState } from './NondeterministicFiniteAutomaton';
import DeterministicFiniteAutomaton from './DeterministicFiniteAutomaton';
import NFAFragment from './NFAFragment';
import Node from './Node';
declare type DFAState = Set<NFAState>;
export default class Regexp {
    private regexp;
    ast: Node;
    nfaFragment: NFAFragment;
    nfa: NondeterministicFiniteAutomaton;
    dfa: DeterministicFiniteAutomaton<DFAState>;
    constructor(regexp: string);
    private compile;
    matches(str: string): boolean;
}
export {};

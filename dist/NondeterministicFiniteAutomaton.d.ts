export declare type NFAState = number;
export declare type NFATransition = (stat: NFAState, char: string) => Set<NFAState>;
export default class NondeterministicFiniteAutomaton {
    transition: NFATransition;
    start: NFAState;
    accepts: Set<NFAState>;
    constructor(transition: NFATransition, start: NFAState, accepts: Set<NFAState>);
    epsilonExpand(set: Set<NFAState>): Set<NFAState>;
}

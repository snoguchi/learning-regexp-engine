'use strict';

import NondeterministicFiniteAutomaton, { NFAState, NFATransition } from './NondeterministicFiniteAutomaton';

class NFAFragment {
  public start: NFAState = null;
  public accepts: Set<NFAState> = null;
  public map: Map<string, Set<NFAState>> = new Map();

  connect(from: NFAState, char: string, to: NFAState) {
    const key = JSON.stringify([from, char]);
    let slot = this.map.get(key);
    if (!slot) {
      this.map.set(key, (slot = new Set()));
    }
    slot.add(to);
  }

  newSkeleton() {
    // コピーして返す
    const newFrag = new NFAFragment();
    newFrag.map = new Map([...this.map]);
    return newFrag;
  }

  __or__(frag: NFAFragment): NFAFragment {
    const newFrag = this.newSkeleton();
    for (let [k, v] of frag.map) {
      newFrag.map.set(k, new Set([...v]));
    }
    return newFrag;
  }

  build() {
    const transition: NFATransition = (state, char) => {
      const key = JSON.stringify([state, char]);
      return new Set(this.map.get(key));
    };

    return new NondeterministicFiniteAutomaton(transition, this.start, this.accepts);
  }
}

export default NFAFragment;

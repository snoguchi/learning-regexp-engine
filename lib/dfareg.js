'use strict';

class NondeterministicFiniteAutomaton {
  constructor({ transition, start, accepts }) {
    this.transition = transition;
    this.start = start;
    this.accepts = accepts;
  }
}

class DeterministicFiniteAutomaton {
  constructor({ transition, start, accepts }) {
    this.transition = transition;
    this.start = start;
    this.accepts = accepts;
  }

  getRuntime() {
    return new DFARuntime(this);
  }
}

class DFARuntime {
  constructor(dfa) {
    this.dfa = dfa;
    this.curState = dfa.start;
  }

  doTranstion(char) {
    this.curState = this.dfa.transition(this.curState, char);
  }

  isAcceptState() {
    return this.dfa.accepts.has(this.curState);
  }

  doesAccept(input) {
    for (let alphabet of input) {
      this.doTranstion(alphabet);
    }
    return this.isAcceptState();
  }
}

const transition = (stat, char) => {
  if (stat === 1 && char === 'a') {
    return 2;
  }
  if (stat === 2 && char === 'b') {
    return 3;
  }
  return 0;
}


const dfa = new DeterministicFiniteAutomaton({
  transition, 
  start: 1,
  accepts: new Set([3])
});

['ab', 'ba'].forEach(str => {
  const runtime = dfa.getRuntime();
  if (runtime.doesAccept(str)) {
    console.log(`${str}は受理されました。`);
  } else {
    console.log(`${str}は受理されませんでした。`);
  }
});

'use strict';

export type NFAState = number;
export type NFATransition = (stat: NFAState, char: string) => Set<NFAState>;

export default class NondeterministicFiniteAutomaton {
  constructor(public transition: NFATransition, public start: NFAState, public accepts: Set<NFAState>) {}

  epsilonExpand(set: Set<NFAState>): Set<NFAState> {
    // 空文字を辿るべき状態を集めたキュー
    const que: Set<NFAState> = new Set(set);
    // 辿り終わった状態
    const done: Set<NFAState> = new Set();
    while (que.size > 0) {
      // キューから取り出す
      const stat: NFAState = que.values().next().value;
      que.delete(stat);
      // 空文字によって辿れる遷移を辿る
      const nexts: Set<NFAState> = this.transition(stat, '');
      // この状態は辿り終わったので、保存
      done.add(stat);
      // 辿って出て来た状態を、さらに空文字で辿るのに、キューに居れる
      for (const nextStat of nexts) {
        // 辿り終わってない要素だけ
        if (!done.has(nextStat)) {
          que.add(nextStat);
        }
      }
    }

    return done;
  }
}

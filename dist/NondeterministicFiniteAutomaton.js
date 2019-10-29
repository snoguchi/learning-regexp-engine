'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class NondeterministicFiniteAutomaton {
    constructor(transition, start, accepts) {
        this.transition = transition;
        this.start = start;
        this.accepts = accepts;
    }
    epsilonExpand(set) {
        // 空文字を辿るべき状態を集めたキュー
        const que = new Set(set);
        // 辿り終わった状態
        const done = new Set();
        while (que.size > 0) {
            // キューから取り出す
            const stat = que.values().next().value;
            que.delete(stat);
            // 空文字によって辿れる遷移を辿る
            const nexts = this.transition(stat, '');
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
exports.default = NondeterministicFiniteAutomaton;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DeterministicFiniteAutomaton_1 = __importDefault(require("./DeterministicFiniteAutomaton"));
const NonDisjointSets_1 = __importDefault(require("./NonDisjointSets"));
const Lexer_1 = __importDefault(require("./Lexer"));
const Context_1 = __importDefault(require("./Context"));
const Parser_1 = __importDefault(require("./Parser"));
const nfa2dfa = (nfa) => {
    const transition = (set, alpha) => {
        let ret = new Set();
        for (const elem of set) {
            ret = new Set([...ret, ...nfa.transition(elem, alpha)]);
        }
        return nfa.epsilonExpand(ret);
    };
    const start = nfa.epsilonExpand(new Set([nfa.start]));
    const accepts = new NonDisjointSets_1.default(nfa.accepts);
    return new DeterministicFiniteAutomaton_1.default(transition, start, accepts);
};
class Regexp {
    constructor(regexp) {
        this.regexp = regexp;
        this.ast = null;
        this.nfaFragment = null;
        this.nfa = null;
        this.dfa = null;
        this.compile();
    }
    compile() {
        const lexer = new Lexer_1.default(this.regexp);
        const parser = new Parser_1.default(lexer);
        this.ast = parser.expression();
        this.nfaFragment = this.ast.assemble(new Context_1.default());
        this.nfa = this.nfaFragment.build();
        this.dfa = nfa2dfa(this.nfa);
    }
    matches(str) {
        const runtime = this.dfa.getRuntime();
        return runtime.doesAccept(str);
    }
}
exports.default = Regexp;

'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("./Token");
const Character_1 = __importDefault(require("./Character"));
const Concat_1 = __importDefault(require("./Concat"));
const Star_1 = __importDefault(require("./Star"));
const Union_1 = __importDefault(require("./Union"));
class Parser {
    constructor(lexer) {
        this.lexer = lexer;
        // 最初の文字を読む
        this.move();
    }
    match(tag) {
        if (this.look.kind !== tag) {
            // 予期せぬトークンが来たら、エラー終了
            throw new SyntaxError(`expected ${tag} but ${this.look.kind}`);
        }
        this.move();
    }
    move() {
        this.look = this.lexer.scan();
    }
    // factor -> '(' subexpr ')' | CHARACTER
    factor() {
        if (this.look.kind === Token_1.TokenKind.LPAREN) {
            // factor -> '(' subexpr ')'
            this.match(Token_1.TokenKind.LPAREN);
            const node = this.subexpr();
            this.match(Token_1.TokenKind.RPAREN);
            return node;
        }
        else {
            // factor -> CHARACTER
            const node = new Character_1.default(this.look.value);
            this.match(Token_1.TokenKind.CHARACTER);
            return node;
        }
    }
    // star -> factor '*' | factor
    star() {
        let node = this.factor();
        if (this.look.kind === Token_1.TokenKind.OPE_STAR) {
            this.match(Token_1.TokenKind.OPE_STAR);
            node = new Star_1.default(node);
        }
        return node;
    }
    // seq -> subseq | ''
    seq() {
        if (this.look.kind === Token_1.TokenKind.LPAREN || this.look.kind === Token_1.TokenKind.CHARACTER) {
            // seq -> subseq
            return this.subseq();
        }
        else {
            // seq -> ''
            return new Character_1.default('');
        }
    }
    // subseq -> star subseq | star
    subseq() {
        const node1 = this.star();
        if (this.look.kind === Token_1.TokenKind.LPAREN || this.look.kind === Token_1.TokenKind.CHARACTER) {
            // subseq -> star subseq
            const node2 = this.subseq();
            return new Concat_1.default(node1, node2);
        }
        else {
            // subseq -> star
            return node1;
        }
    }
    // subexpr -> seq '|' subexpr | seq
    subexpr() {
        const node1 = this.seq();
        if (this.look.kind === Token_1.TokenKind.OPE_UNION) {
            // subexpr -> seq '|' subexpr
            this.match(Token_1.TokenKind.OPE_UNION);
            const node2 = this.subexpr();
            return new Union_1.default(node1, node2);
        }
        else {
            // subexpr -> seq
            return node1;
        }
    }
    // expression -> subexpr EOF
    expression() {
        // expression -> subexpr EOF
        const node = this.subexpr();
        this.match(Token_1.TokenKind.EOF);
        return node;
    }
}
exports.default = Parser;

"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = __importStar(require("./Token"));
class Lexer {
    constructor(string_) {
        this.stringList = string_.split('');
    }
    scan() {
        if (this.stringList.length === 0) {
            return new Token_1.default(null, Token_1.TokenKind.EOF);
        }
        const ch = this.stringList.shift();
        if (ch === '\\') {
            // エスケープ文字の処理。次の文字を文字トークンとして返す
            return new Token_1.default(this.stringList.shift(), Token_1.TokenKind.CHARACTER);
        }
        else if (ch === '|') {
            return new Token_1.default(ch, Token_1.TokenKind.OPE_UNION);
        }
        else if (ch === '(') {
            return new Token_1.default(ch, Token_1.TokenKind.LPAREN);
        }
        else if (ch === ')') {
            return new Token_1.default(ch, Token_1.TokenKind.RPAREN);
        }
        else if (ch === '*') {
            return new Token_1.default(ch, Token_1.TokenKind.OPE_STAR);
        }
        else {
            // 通常の文字
            return new Token_1.default(ch, Token_1.TokenKind.CHARACTER);
        }
    }
}
exports.default = Lexer;

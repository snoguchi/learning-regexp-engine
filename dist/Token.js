"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenKind;
(function (TokenKind) {
    TokenKind["CHARACTER"] = "CHARACTER";
    TokenKind["OPE_UNION"] = "OPE_UNION";
    TokenKind["OPE_STAR"] = "OPE_STAR";
    TokenKind["LPAREN"] = "LPAREN";
    TokenKind["RPAREN"] = "RPAREN";
    TokenKind["EOF"] = "EOF"; // 文末を表す
})(TokenKind = exports.TokenKind || (exports.TokenKind = {}));
class Token {
    constructor(value, kind) {
        this.value = value;
        this.kind = kind;
    }
}
exports.default = Token;

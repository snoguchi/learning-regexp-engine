export declare enum TokenKind {
    CHARACTER = "CHARACTER",
    OPE_UNION = "OPE_UNION",
    OPE_STAR = "OPE_STAR",
    LPAREN = "LPAREN",
    RPAREN = "RPAREN",
    EOF = "EOF"
}
export default class Token {
    value: string;
    kind: TokenKind;
    constructor(value: string, kind: TokenKind);
}

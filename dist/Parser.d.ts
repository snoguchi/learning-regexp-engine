import { TokenKind } from './Token';
import Node from './Node';
import Lexer from './Lexer';
export default class Parser {
    private lexer;
    private look;
    constructor(lexer: Lexer);
    match(tag: TokenKind): void;
    move(): void;
    factor(): Node;
    star(): Node;
    seq(): Node;
    subseq(): Node;
    subexpr(): Node;
    expression(): Node;
}

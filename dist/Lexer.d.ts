import Token from './Token';
export default class Lexer {
    private stringList;
    constructor(string_: string);
    scan(): Token;
}

import Token, { TokenKind } from './Token';

export default class Lexer {
  private stringList: Array<string>;

  constructor(string_: string) {
    this.stringList = string_.split('');
  }

  scan(): Token {
    if (this.stringList.length === 0) {
      return new Token(null, TokenKind.EOF);
    }

    const ch = this.stringList.shift();

    if (ch === '\\') {
      // エスケープ文字の処理。次の文字を文字トークンとして返す
      return new Token(this.stringList.shift(), TokenKind.CHARACTER);
    } else if (ch === '|') {
      return new Token(ch, TokenKind.OPE_UNION);
    } else if (ch === '(') {
      return new Token(ch, TokenKind.LPAREN);
    } else if (ch === ')') {
      return new Token(ch, TokenKind.RPAREN);
    } else if (ch === '*') {
      return new Token(ch, TokenKind.OPE_STAR);
    } else {
      // 通常の文字
      return new Token(ch, TokenKind.CHARACTER);
    }
  }
}

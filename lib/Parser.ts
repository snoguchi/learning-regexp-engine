'use strict';

import Token, { TokenKind } from './Token';
import Node from './Node';
import Character from './Character';
import Concat from './Concat';
import Star from './Star';
import Union from './Union';
import Lexer from './Lexer';

export default class Parser {
  private look: Token;

  constructor(private lexer: Lexer) {
    // 最初の文字を読む
    this.move();
  }

  match(tag: TokenKind): void {
    if (this.look.kind !== tag) {
      // 予期せぬトークンが来たら、エラー終了
      throw new SyntaxError(`expected ${tag} but ${this.look.kind}`);
    }
    this.move();
  }

  move(): void {
    this.look = this.lexer.scan();
  }

  // factor -> '(' subexpr ')' | CHARACTER
  factor(): Node {
    if (this.look.kind === TokenKind.LPAREN) {
      // factor -> '(' subexpr ')'
      this.match(TokenKind.LPAREN);
      const node: Node = this.subexpr();
      this.match(TokenKind.RPAREN);
      return node;
    } else {
      // factor -> CHARACTER
      const node: Node = new Character(this.look.value);
      this.match(TokenKind.CHARACTER);
      return node;
    }
  }

  // star -> factor '*' | factor
  star(): Node {
    let node: Node = this.factor();
    if (this.look.kind === TokenKind.OPE_STAR) {
      this.match(TokenKind.OPE_STAR);
      node = new Star(node);
    }
    return node;
  }

  // seq -> subseq | ''
  seq(): Node {
    if (this.look.kind === TokenKind.LPAREN || this.look.kind === TokenKind.CHARACTER) {
      // seq -> subseq
      return this.subseq();
    } else {
      // seq -> ''
      return new Character('');
    }
  }

  // subseq -> star subseq | star
  subseq(): Node {
    const node1: Node = this.star();
    if (this.look.kind === TokenKind.LPAREN || this.look.kind === TokenKind.CHARACTER) {
      // subseq -> star subseq
      const node2: Node = this.subseq();
      return new Concat(node1, node2);
    } else {
      // subseq -> star
      return node1;
    }
  }

  // subexpr -> seq '|' subexpr | seq
  subexpr(): Node {
    const node1: Node = this.seq();
    if (this.look.kind === TokenKind.OPE_UNION) {
      // subexpr -> seq '|' subexpr
      this.match(TokenKind.OPE_UNION);
      const node2: Node = this.subexpr();
      return new Union(node1, node2);
    } else {
      // subexpr -> seq
      return node1;
    }
  }

  // expression -> subexpr EOF
  expression(): Node {
    // expression -> subexpr EOF
    const node: Node = this.subexpr();
    this.match(TokenKind.EOF);
    return node;
  }
}

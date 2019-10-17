export enum TokenKind {
  CHARACTER = 'CHARACTER', // 文字を表すトークン。'a'～'z'、'あ'～'ん'、等
  OPE_UNION = 'OPE_UNION', // 和集合演算 '|'
  OPE_STAR = 'OPE_STAR', // 繰り返し演算 '*'
  LPAREN = 'LPAREN', // 左括弧 '('
  RPAREN = 'RPAREN', // 右括弧 ')'
  EOF = 'EOF' // 文末を表す
}

export default class Token {
  constructor(public value: string, public kind: TokenKind) {}
}

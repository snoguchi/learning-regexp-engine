import NFAFragment from './NFAFragment';
import Node from './Node';
import Context from './Context';
declare class Character implements Node {
    private char;
    constructor(char: string);
    assemble(context: Context): NFAFragment;
}
export default Character;

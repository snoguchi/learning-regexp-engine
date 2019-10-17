import Context from './Context';
import NFAFragment from './NFAFragment';

export default interface Node {
  assemble(context: Context): NFAFragment;
}

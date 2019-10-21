export default class NonDisjointSets<T> extends Set<Set<T>> {
  constructor(private sub: Set<T>) {
    super();
  }

  has(aSet: Set<T>): boolean {
    return [...this.sub].some(e => aSet.has(e));
  }
}

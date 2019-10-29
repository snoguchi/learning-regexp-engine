export default class NonDisjointSets<T> extends Set<Set<T>> {
    private sub;
    constructor(sub: Set<T>);
    has(aSet: Set<T>): boolean;
}

import dfareg from '../lib/dfareg';

describe('dfareg', () => {
  it('should match #1', () => {
    const regexp = dfareg.compile("(p(erl|ython|hp)|ruby)");
    expect(regexp.matches("python")).toBeTruthy();
    expect(regexp.matches("ruby")).toBeTruthy();
    expect(regexp.matches("VB")).toBeFalsy();
  });

  it('should match #2', () => {
    const regexp = dfareg.compile("(ABC*|abc*)*");
    expect(regexp.matches("ABC")).toBeTruthy();
    expect(regexp.matches("ABBC")).toBeFalsy();
    expect(regexp.matches("abcccABABC")).toBeTruthy();
    expect(regexp.matches("abABAb")).toBeFalsy();
    expect(regexp.matches("")).toBeTruthy();
  });
});

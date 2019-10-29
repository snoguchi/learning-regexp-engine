import Regexp from './Regexp';

const dfareg = {
  compile(regexp: string): Regexp {
    return new Regexp(regexp);
  }
};

export default dfareg;

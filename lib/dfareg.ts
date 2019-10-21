import Regexp from './Regexp';

export default {
  compile(regexp: string): Regexp {
    return new Regexp(regexp);
  }
};

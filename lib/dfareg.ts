import Regexp from './Regexp';

export default {
  compile(regexp: string) {
    return new Regexp(regexp);
  }
};

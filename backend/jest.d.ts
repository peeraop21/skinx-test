declare namespace jest {
    interface Matchers<R> {
      toMatchSnapshot(): R;
    }
  }
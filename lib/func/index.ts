function handleError(to: false | string) {
  function toFalse(
    pre: { error: false } | { error: true; errMsg: string }
  ): { error: false } | { error: true; errMsg: string } {
    return pre.error ? { error: false } : pre;
  }
  function toTrue(
    pre: { error: false } | { error: true; errMsg: string }
  ): { error: false } | { error: true; errMsg: string } {
    if (to === false) {
      throw new Error("Error While Veridating Input!");
    }
    return pre.error && pre.errMsg === to ? pre : { error: true, errMsg: to };
  }
  return to ? toTrue : toFalse;
}

export { handleError };

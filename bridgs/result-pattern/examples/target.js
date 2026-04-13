// TARGET: Result pattern — never throws, always returns Result
function divide(a, b) {
  if (b === 0) {
    return Result.fail("Cannot divide by zero");
  }
  return Result.ok(a / b);
}

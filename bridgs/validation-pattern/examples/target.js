// TARGET: Validated inputs + Result pattern applied
function divide(a, b) {
  if (a == null) return Result.fail("a is required");
  if (b == null) return Result.fail("b is required");
  if (typeof a !== "number") return Result.fail("a must be a number");
  if (typeof b !== "number") return Result.fail("b must be a number");
  if (b === 0) return Result.fail("Cannot divide by zero");
  return Result.ok(a / b);
}

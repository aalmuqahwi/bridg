// SOURCE: Raw function — returns value directly, throws on error
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

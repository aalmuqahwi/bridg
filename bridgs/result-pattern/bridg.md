---
name: result-pattern
description: Transforms functions that throw into functions that return a Result object
version: 1.0.0
requires: ~
triggers:
  phrases:
    - "bridg this"
    - "convert throws to result"
    - "wrap this in result"
    - "apply result pattern"
  detects:
    - functions that throw exceptions
    - functions that return raw values without wrapping
---

## Source
Functions that:
- Return raw values directly
- Throw exceptions on failure
- Leave error handling to the caller

## Target
Functions that:
- Always return a `Result` object
- Never throw
- Encode success and failure in the return value

## Map
| Source Pattern         | Target Pattern             |
|------------------------|----------------------------|
| `return value`         | `return Result.ok(value)`  |
| `throw new Error(msg)` | `return Result.fail(msg)`  |
| Raw return type        | `Result<T>`                |

## Rules
- Every `throw` becomes `Result.fail(message)`
- Every successful `return` becomes `Result.ok(value)`
- Function signature stays the same — only the body changes
- Do not wrap the entire function in try/catch — map each case explicitly

## Gotchas
- If the function has multiple return points, every one must be mapped
- Do not swallow the error message — preserve it in `Result.fail`
- If the caller checks for thrown errors, flag it in Remainder

## Remainder
Hand off to developer:
- Any caller that currently uses try/catch around this function
- Any place that checks the raw return value directly
- Business logic inside the error message that may need a code, not just a string

---
name: validation-pattern
description: Adds input validation to functions before execution
version: 1.0.0
requires:
  - bridg: result-pattern
    version: ">=1.0.0"
triggers:
  detects:
    - functions that assume valid input
    - functions with no input validation
---

## Source
Functions that:
- Accept parameters without validating them
- Assume inputs are always correct
- Crash or behave unexpectedly on bad input

## Target
Functions that:
- Validate all inputs before execution
- Return Result.fail() immediately on invalid input
- Never proceed with bad data

## Map
| Source Pattern            | Target Pattern                                      |
|---------------------------|-----------------------------------------------------|
| No validation             | Check each parameter before execution               |
| Implicit type assumption  | Explicit type check → Result.fail() if wrong        |
| Implicit null assumption  | Explicit null/undefined check → Result.fail() if missing |

## Rules
- Validation runs before any logic
- Each invalid input returns Result.fail() with a clear message
- Do not change the function logic — only add validation at the top
- Result handling is delegated to result-pattern — do not redefine it here.

## Gotchas
- Do not over-validate — only check what can actually break the function
- Preserve the original error messages where they exist
- Do not add validation for parameters that are intentionally flexible

## Remainder
Hand off to developer:
- Business rule validations (e.g. age must be over 18) — Bridg only handles type/null checks
- Complex object shape validation
- Async validation requirements

# validation-pattern Bridg

Adds input validation to functions before execution. Depends on `result-pattern`.

## What it does

| Before | After |
|--------|-------|
| No validation | Null/undefined checks |
| Implicit type assumptions | Explicit type checks → `Result.fail()` |

## Composition

This Bridg requires `result-pattern`. Install both:

```bash
git clone https://github.com/your-repo/bridg ~/.claude/bridgs/result-pattern
git clone https://github.com/your-repo/bridg ~/.claude/bridgs/validation-pattern
```

Claude runs `result-pattern` first, then builds `validation-pattern` on top.

## Examples

See `examples/source.js` → `examples/target.js`

## Improve this Bridg

Hit a case this didn't handle? Update `bridg.md` and submit a PR.

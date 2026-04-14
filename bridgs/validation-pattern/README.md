# validation-pattern Bridg

Adds input validation to functions before execution. Depends on `result-pattern`.

## What it does

| Before | After |
|--------|-------|
| No validation | Null/undefined checks |
| Implicit type assumptions | Explicit type checks → `Result.fail()` |

## Composition

This Bridg requires `result-pattern`. Install both:

**1. Create the Bridgs folder if it doesn't exist:**
```
~/.claude/bridgs/
```

**2. Copy both folders into it:**
```
~/.claude/bridgs/result-pattern/
~/.claude/bridgs/validation-pattern/
```

**3. Add the bootstrapper to your `CLAUDE.md`** (see root README for the snippet).

Claude runs `result-pattern` first, then builds `validation-pattern` on top.

## Examples

See `examples/source.js` → `examples/target.js`

## Improve this Bridg

Hit a case this didn't handle? Update `bridg.md` and submit a PR.

# result-pattern Bridg

Transforms functions that throw exceptions into functions that return a `Result` object.

## What it does

| Before | After |
|--------|-------|
| `throw new Error(msg)` | `return Result.fail(msg)` |
| `return value` | `return Result.ok(value)` |

## Examples

See `examples/source.js` → `examples/target.js`

## Install

**1. Create the Bridgs folder if it doesn't exist:**
```
~/.claude/bridgs/
```

**2. Copy this folder into it:**
```
~/.claude/bridgs/result-pattern/
```

**3. Add the bootstrapper to your `CLAUDE.md`** (see root README for the snippet), then:

```
"Bridg this."
```

## Improve this Bridg

Hit a case this didn't handle? Update `bridg.md` and submit a PR.
That's how it gets smarter.

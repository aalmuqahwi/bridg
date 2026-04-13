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

```bash
git clone https://github.com/your-repo/bridg ~/.claude/bridgs/result-pattern
```

Add the bootstrapper to your `CLAUDE.md` (see root README), then:

```
"Bridg this."
```

## Improve this Bridg

Hit a case this didn't handle? Update `bridg.md` and submit a PR.
That's how it gets smarter.

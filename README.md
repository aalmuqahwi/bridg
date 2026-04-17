# Bridg

> ⚠️ This is an experiment. A concept being explored in public. Rough edges exist. Fight the ideas, not the author. 😄

A new primitive for Claude Code. Not a Skill. A transformation driver.

---

## The Story

I was learning Modular Monolith, Clean Architecture, and DDD. I built my SharedKernel — all the abstract code, the base classes, the patterns. Then I looked at my old CRUD project and thought: *someone has to move all of this.*

I knew Claude Code was powerful with Skills. And I thought — what if I could write something like a Skill, but instead of teaching Claude how to behave, it taught Claude how to **transform** my old code into the new architecture?

Not a guide. Not a prompt. A precise adapter between two worlds.

I called it a Bridg.

---

## What is a Bridg?

**Skills** teach Claude how to behave.  
**Bridgs** teach Claude how to transform code from one architectural world to another.

A Bridg is a folder you drop in `~/.claude/bridgs/`. You trigger it yourself:

Three ways to trigger:
- `bridg this` — auto. Claude detects and lists matching Bridgs.
- `bridg {name}` — named. Runs on current open file.
- `bridg {name} {file}` — named + scoped. Most explicit.

Claude reads the Bridg, transforms your code, and flags exactly what needs your decision.

---

## Proof

Three cold tests on functions the Bridg had never seen.

**Test 1**
```javascript
// Before
function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}

// After
function divide(a, b) {
  if (b === 0) return Result.fail("Cannot divide by zero");
  return Result.ok(a / b);
}
```

**Test 2 — different function, never seen before** ✅
```javascript
// Before
function getUserAge(birthYear) {
  const age = new Date().getFullYear() - birthYear;
  if (age < 0) {
    throw new Error("Birth year cannot be in the future");
  }
  return age;
}

// After — Bridg applied result-pattern correctly
function getUserAge(birthYear) {
  const age = new Date().getFullYear() - birthYear;
  if (age < 0) {
    return Result.fail("Birth year cannot be in the future");
  }
  return Result.ok(age);
}
```

**Test 3 — multiple throws, real complexity** ✅
```javascript
// Before
function processOrder(order) {
  if (!order) throw new Error("Order is required");
  if (order.items.length === 0) throw new Error("Order has no items");
  const total = order.items.reduce((sum, item) => sum + item.price, 0);
  if (total <= 0) throw new Error("Order total must be positive");
  return total;
}

// After — every throw mapped, intermediate logic preserved
function processOrder(order) {
  if (!order) return Result.fail("Order is required");
  if (order.items.length === 0) return Result.fail("Order has no items");
  const total = order.items.reduce((sum, item) => sum + item.price, 0);
  if (total <= 0) return Result.fail("Order total must be positive");
  return Result.ok(total);
}
```

Then a full CRUD `UserService` → Modular Monolith. One instruction:

```
"Bridg UserService.js"
```

Output — five files generated correctly:
- `CreateUserUseCase.js` — business logic only, Repository injected
- `UserRepository.js` — all db calls isolated
- `User.js` — extends shared `Entity`
- `GetUserByIdUseCase.js`, `UpdateUserUseCase.js`, `DeleteUserUseCase.js`

Cross-module dependency flagged in the Remainder — not resolved silently:

```
Remainder:
- Cross-module dependency in CreateOrderUseCase — you decide the coupling strategy
- total <= 0 guard — business rule, not a type check. You own this.
- order.status state machine — consider moving to the Order entity
- Repository wiring — Bridg creates the interface only
```

---

## Format

A Bridg is a folder:

```
~/.claude/bridgs/
  /{bridg-name}/
    bridg.md        ← the heart — what Claude reads
    examples/       ← before/after code samples
    README.md       ← setup instructions
```

`bridg.md` uses YAML frontmatter:

```markdown
---
name: result-pattern
description: Transforms functions that throw into functions that return a Result object
version: 1.0.0
triggers:
  detects:
    - functions that throw exceptions
    - functions that return raw values without wrapping
stack:
  nuget:
    - logging: Serilog.AspNetCore >= 8.0.0
    - mediator: MediatR >= 12.0.0
  npm:
    - validation: zod >= 3.0.0
---

## Source
## Target
## Map
## Rules
## Gotchas
## Remainder
```

**Fields:**
- `name` — unique identifier. used in requires and trigger commands.
- `description` — what it transforms. one sentence.
- `version` — semver.
- `requires` — optional. omit if no dependencies. versioned. Claude enforces before running.
- `triggers.detects` — code patterns Claude scans for in auto mode.
- `stack` — optional. package manager as key. intent: Package.Name >= version. Claude uses these when generating — no substitutions.

**Sections:**
- `Source` — what the old world looks like
- `Target` — what the new world looks like
- `Map` — explicit pattern-to-pattern translation table
- `Rules` — author's opinions on how to execute. not a standard.
- `Gotchas` — what trips people up. written from experience.
- `Remainder` — explicit handoff. what the Bridg intentionally does not do.

---

## Triggering

Three modes:

**`bridg this`**  
Auto mode. Claude scans `~/.claude/bridgs/`, matches against `triggers.detects`, and lists what it finds.
- One match → confirms before running
- Multiple matches → lists them, user picks
- No match → lists all available Bridgs

**`bridg {name}`**  
Named mode. Skips detection. Runs on current open file. Confirms before running.

**`bridg {name} {file}`**  
Named + scoped. Skips detection. Targets specific file. Confirms before running.

Rule: Claude always confirms before running. Always shows output destination. Never silent.

---

## Composition

Bridgs compose via `requires`. Declare dependencies with version constraints:

```yaml
requires:
  - bridg: result-pattern
    version: ">=1.0.0"
```

Rules:
- `requires` is optional. Omit entirely if no dependencies.
- Claude verifies all dependencies exist and version constraints are met before running.
- Missing dependency or version mismatch → stops and tells you exactly what to install.
- Execution is additive — each Bridg builds on the output of the previous. Never on the original.

## Stack

Optional. Declare preferred packages per package manager.

```yaml
stack:
  nuget:
    - logging: Serilog.AspNetCore >= 8.0.0
    - mediator: MediatR >= 12.0.0
    - validation: FluentValidation.AspNetCore >= 11.0.0
  npm:
    - validation: zod >= 3.0.0
```

The key is the package manager: `nuget`, `npm`, `maven`, `pip`, `cargo`.  
Mixed stacks are supported — .NET backend + npm frontend works naturally.  
Claude uses declared packages when generating code. No substitutions.  
Stack is the author's preference, not a standard.

---

## Why Not Just a Skill?

|  | Skill | Bridg |
|--|-------|-------|
| Purpose | Shape behavior | Transform code |
| Direction | Ambient | Source → Target |
| Composition | No | Via `requires:` |
| Compounds over time | No | Yes |
| Remainder | No | Explicit handoff |

---

## Available Bridgs

| Bridg | Transforms | Requires |
|-------|-----------|----------|
| `result-pattern` | Raw throws → Result object | — |
| `validation-pattern` | No validation → typed guards | result-pattern >= 1.0.0 |
| `crud-to-modular-monolith` | Flat CRUD → Use Cases + Repository + Entity | result-pattern >= 1.0.0 |

---

## Setup

**1. Create the Bridgs folder if it doesn't exist:**
```
~/.claude/bridgs/
```

**2. Copy a Bridg folder into it manually.**

For example, copy `result-pattern/` from this repo into:
```
~/.claude/bridgs/result-pattern/
```

Your folder should look like this when done:
```
~/.claude/bridgs/
  /result-pattern/
    bridg.md
    examples/
    README.md
```

**3. Add the bootstrapper to your project's `CLAUDE.md`:**

> ⚠️ This is a temporary workaround. The vision is Bridg as a native Claude Code primitive — like Skills — so no bootstrapper is needed. Until then:

```markdown
## Bridgs

Bridgs are migration drivers located in ~/.claude/bridgs/
Each Bridg folder contains a bridg.md file with a frontmatter triggers block.

### Trigger modes

Three ways to trigger a Bridg:

1. Auto: "bridg this"
   - Scan all bridg.md files in ~/.claude/bridgs/
   - Match current file against triggers.detects
   - One match found:
     "Found {bridg-name} — run it on {current-file}? Confirm?"
   - Multiple matches found:
     "Found {n} Bridgs that match:
      1. {name} — {description}
      2. {name} — {description}
      Which one?"
   - No match found:
     "No Bridg found for this pattern.
      Available Bridgs: {list all bridg names from ~/.claude/bridgs/}"

2. Named: "bridg {name}"
   - Skip detection
   - Load {name} from ~/.claude/bridgs/{name}/bridg.md
   - Confirm before running:
     "Running {name} on {current-file} — confirm?"

3. Named + scoped: "bridg {name} {file}"
   - Skip detection
   - Load {name} from ~/.claude/bridgs/{name}/bridg.md
   - Confirm before running:
     "Running {name} on {file} — confirm?"

### Output
Before executing, Claude must identify the output destination:
- Detect the target project from context
- Include in confirmation:
  "Output will go to {target-path}. Confirm or specify a different path."

### Rules
- Never run a Bridg without user confirmation
- Always show output destination before running
- If requires block exists, verify all dependencies before confirming:
  "This Bridg requires {name} >= {version}.
   Found: {installed-version} / Not installed.
   Resolve before proceeding."
- If Bridg not found by name:
  "Bridg {name} not found in ~/.claude/bridgs/
   Available: {list}"
```

**4. Trigger a Bridg:**

Auto — let Claude detect:
```
bridg this
```

Named — you know what you want:
```
bridg result-pattern
```

Named + scoped — target a specific file:
```
bridg crud-to-modular-monolith UserService.cs
```

> Was the setup easy or painful? Open an issue and let me know. That feedback shapes whether this becomes a native primitive.

---

## Write Your Own

The best Bridg is one you've already done manually.

If you've migrated something by hand and wished you could bottle it — that's your Bridg.

1. Create `~/.claude/bridgs/{your-bridg-name}/bridg.md`
2. Fill in: Source, Target, Map, Rules, Gotchas, Remainder
3. Test it cold on a function it's never seen
4. Share it

The format is the standard. The rules are your opinion.

---

*A vision for what Claude Code could natively become. v0.2*

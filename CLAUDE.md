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
- Only apply what the Bridg explicitly defines
- Do NOT add code not covered by the Bridg
- Flag anything beyond the Bridg scope in Remainder — do not execute it
- When executing multiple Bridgs in sequence:
  1. Apply first Bridg to the original code
  2. Apply next Bridg to the output of the previous — never the original
  3. Each Bridg is additive — never discard transformations from a previous Bridg
- If requires block exists, verify all dependencies before confirming:
  "This Bridg requires {name} >= {version}. 
   Found: {installed-version} / Not installed.
   Resolve before proceeding."
- If Bridg not found by name:
  "Bridg {name} not found in ~/.claude/bridgs/
   Available: {list}"

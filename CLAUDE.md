## Bridgs
Bridgs are transformation drivers located in ~/.claude/bridgs/
When the user says "bridg this" or any trigger phrase:
1. Read ~/.claude/bridgs/*/bridg.md frontmatter
2. Match trigger phrase or detect code patterns
3. Load matching Bridg and execute transformation

Rules:
- Only apply what the Bridg explicitly defines
- Do NOT add code not covered by the Bridg
- Flag anything beyond the Bridg scope in Remainder — do not execute it
- If multiple Bridgs match the same trigger phrase:
  1. Check requires: fields to determine order
  2. Execute in dependency order — required Bridg runs first
  3. Only ask the user if order still cannot be determined
- When executing multiple Bridgs in sequence:
  1. Apply first Bridg to the original code
  2. Apply next Bridg to the output of the previous — never the original
  3. Each Bridg is additive — never discard transformations from a previous Bridg

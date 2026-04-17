---
name: crud-to-modular-monolith
description: Migrates a flat CRUD service into a Modular Monolith with Use Cases, Entities, and Repositories
version: 1.0.0
requires:
  - bridg: result-pattern
    version: ">=1.0.0"
stack:
  nuget:
    - logging: Serilog.AspNetCore >= 8.0.0
    - mediator: MediatR >= 12.0.0
    - validation: FluentValidation.AspNetCore >= 11.0.0
triggers:
  detects:
    - flat service files with mixed business logic and database calls
    - functions that call db directly
    - no separation between domain and persistence
---

## Source
A flat CRUD service that:
- Mixes business logic with database calls
- Uses a shared db object directly
- Throws exceptions on failure
- Has no domain model — works with raw objects

## Target
A module folder containing:
- `{Name}UseCase.js` — one file per operation, contains business logic only
- `{Name}Repository.js` — all database calls, one per entity
- `{Name}.js` — Entity class extending shared Entity
- All operations return Result — never throw


## Structure
Each migrated module goes into:
```
/modules/{name}/
  {Name}.js               ← Entity
  {Name}Repository.js     ← Persistence
  Create{Name}UseCase.js  ← One file per operation
  Get{Name}ByIdUseCase.js
  ...
```

Shared files already exist in `/shared/`:
- `Result.js` — do not recreate
- `Entity.js` — do not recreate

## Rules
- Scan the entire service before generating anything
- Identify the primary noun — that becomes the module name
- Classify each function by intent: Command (writes) or Query (reads)
- Name UseCases from intent, not from original function name
- If intent is ambiguous, add to Remainder — do not guess
- One UseCase per operation, regardless of original structure
- Any direct db call moves to Repository — no exceptions
- Do not change business logic — only restructure
- Run per module, not per project — one noun at a time
- If stack block exists, use declared packages — do not substitute

## Gotchas
- Cross-module dependencies (e.g. OrderService checks if User exists) — flag in Remainder, do not resolve automatically
- Preserve all validation logic — move it into the UseCase, not the Entity
- Repository methods return raw data — UseCase wraps in Result

## Remainder
Hand off to developer:
- Cross-module calls that require inter-module communication
- Any business rules that belong in the Entity vs the UseCase
- Database implementation inside Repository — Bridg creates the interface only
- Functions with unclear domain intent — confirm UseCase name with 
  developer before generating.

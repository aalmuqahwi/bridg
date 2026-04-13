---
name: crud-to-modular-monolith
description: Migrates a flat CRUD service into a Modular Monolith with Use Cases, Entities, and Repositories
version: 1.0.0
requires: result-pattern
triggers:
  phrases:
    - "bridg this"
    - "bridg this module"
    - "migrate this to modular monolith"
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

## Map
| Source Pattern                        | Target Pattern                              |
|---------------------------------------|---------------------------------------------|
| `function createUser()`               | `CreateUserUseCase.js` with `execute()`     |
| `function getUserById()`              | `GetUserByIdUseCase.js` with `execute()`    |
| `db.insert()`                         | `UserRepository.save()`                     |
| `db.findById()`                       | `UserRepository.findById()`                 |
| `db.update()`                         | `UserRepository.update()`                   |
| `db.delete()`                         | `UserRepository.delete()`                   |
| Raw object `{ id, name, email }`      | `User extends Entity`                       |
| `throw new Error(msg)`                | `return Result.fail(msg)`                   |
| `return rawValue`                     | `return Result.ok(value)`                   |

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
- One UseCase per operation — never combine multiple operations in one file
- UseCases receive the Repository as a constructor argument — never import db directly
- Entities extend Entity from `/shared/Entity.js`
- All throws become Result.fail()
- All raw returns become Result.ok()
- Do not change business logic — only restructure

## Gotchas
- Cross-module dependencies (e.g. OrderService checks if User exists) — flag in Remainder, do not resolve automatically
- Preserve all validation logic — move it into the UseCase, not the Entity
- Repository methods return raw data — UseCase wraps in Result

## Remainder
Hand off to developer:
- Cross-module calls that require inter-module communication
- Any business rules that belong in the Entity vs the UseCase
- Database implementation inside Repository — Bridg creates the interface only

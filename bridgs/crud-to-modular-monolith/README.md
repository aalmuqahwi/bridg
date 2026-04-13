# crud-to-modular-monolith Bridg

Migrates a flat CRUD service into a Modular Monolith with Use Cases, Entities, and Repositories.

## What it does

Takes this:
```
UserService.js  ← business logic + db mixed together
```

Produces this:
```
/modules/users/
  User.js                  ← Entity
  UserRepository.js        ← Persistence
  CreateUserUseCase.js
  GetUserByIdUseCase.js
  GetAllUsersUseCase.js
  UpdateUserUseCase.js
  DeleteUserUseCase.js
```

## Before you run it

Your new project needs these shared files pre-built:
```
/shared/
  Result.js
  Entity.js
```

See `examples/new-project/shared/` for reference implementations.

## Examples

See `examples/old-project/` → `examples/new-project/`

## Workspace setup

```
/your-workspace/
  CLAUDE.md         ← bootstrapper
  /old-project/     ← your CRUD project
  /new-project/     ← your Modular Monolith target
    /shared/
    /modules/
```

Open Claude Code at the workspace root, then:

```
"Bridg UserService.js"
```

## Remainder — what you handle

- Cross-module dependencies
- Business rules in the Entity vs UseCase
- Database wiring at composition root

## Improve this Bridg

Hit a case this didn't handle? Update `bridg.md` and submit a PR.

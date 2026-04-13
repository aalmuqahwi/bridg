const Result = require("../../shared/Result");
class CreateUserUseCase {
  constructor(userRepository) { this.userRepository = userRepository; }
  execute(name, email) {
    if (!name) return Result.fail("Name is required");
    if (!email) return Result.fail("Email is required");
    if (!email.includes("@")) return Result.fail("Email is invalid");
    const user = this.userRepository.save({ name, email });
    return Result.ok(user);
  }
}
module.exports = CreateUserUseCase;

const Result = require("../../shared/Result");
class UpdateUserUseCase {
  constructor(userRepository) { this.userRepository = userRepository; }
  execute(id, name, email) {
    if (!id) return Result.fail("ID is required");
    const user = this.userRepository.findById(id);
    if (!user) return Result.fail("User not found");
    const updated = this.userRepository.update(id, { name, email });
    return Result.ok(updated);
  }
}
module.exports = UpdateUserUseCase;

const Result = require("../../shared/Result");
class DeleteUserUseCase {
  constructor(userRepository) { this.userRepository = userRepository; }
  execute(id) {
    if (!id) return Result.fail("ID is required");
    const user = this.userRepository.findById(id);
    if (!user) return Result.fail("User not found");
    this.userRepository.delete(id);
    return Result.ok(true);
  }
}
module.exports = DeleteUserUseCase;

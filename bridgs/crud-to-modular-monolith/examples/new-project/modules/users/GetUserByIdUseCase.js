const Result = require("../../shared/Result");
class GetUserByIdUseCase {
  constructor(userRepository) { this.userRepository = userRepository; }
  execute(id) {
    if (!id) return Result.fail("ID is required");
    const user = this.userRepository.findById(id);
    if (!user) return Result.fail("User not found");
    return Result.ok(user);
  }
}
module.exports = GetUserByIdUseCase;

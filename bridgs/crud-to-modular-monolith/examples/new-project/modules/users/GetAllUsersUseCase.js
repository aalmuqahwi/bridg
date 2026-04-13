const Result = require("../../shared/Result");
class GetAllUsersUseCase {
  constructor(userRepository) { this.userRepository = userRepository; }
  execute() { return Result.ok(this.userRepository.findAll()); }
}
module.exports = GetAllUsersUseCase;

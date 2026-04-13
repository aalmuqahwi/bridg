const Result = require("../../shared/Result");
class CreateOrderUseCase {
  constructor(orderRepository, userRepository) {
    this.orderRepository = orderRepository;
    this.userRepository = userRepository;
  }
  execute(userId, items) {
    if (!userId) return Result.fail("User ID is required");
    if (!items || items.length === 0) return Result.fail("Order must have items");
    const user = this.userRepository.findById(userId);
    if (!user) return Result.fail("User not found");
    const total = items.reduce((sum, item) => sum + item.price, 0);
    if (total <= 0) return Result.fail("Order total must be positive");
    const order = this.orderRepository.save({ userId, items, total });
    return Result.ok(order);
  }
}
module.exports = CreateOrderUseCase;

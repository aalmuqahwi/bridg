const Result = require("../../shared/Result");
class GetOrderByIdUseCase {
  constructor(orderRepository) { this.orderRepository = orderRepository; }
  execute(id) {
    if (!id) return Result.fail("ID is required");
    const order = this.orderRepository.findById(id);
    if (!order) return Result.fail("Order not found");
    return Result.ok(order);
  }
}
module.exports = GetOrderByIdUseCase;

const Result = require("../../shared/Result");
class CancelOrderUseCase {
  constructor(orderRepository) { this.orderRepository = orderRepository; }
  execute(id) {
    if (!id) return Result.fail("ID is required");
    const order = this.orderRepository.findById(id);
    if (!order) return Result.fail("Order not found");
    if (order.status === "cancelled") return Result.fail("Order already cancelled");
    const updated = this.orderRepository.update(id, { status: "cancelled" });
    return Result.ok(updated);
  }
}
module.exports = CancelOrderUseCase;

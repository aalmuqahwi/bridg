const Entity = require("../../shared/Entity");
class Order extends Entity {
  constructor(id, userId, items, total, status = "active") {
    super(id); this.userId = userId; this.items = items; this.total = total; this.status = status;
  }
}
module.exports = Order;

const db = require("./db");

function createOrder(userId, items) {
  if (!userId) throw new Error("User ID is required");
  if (!items || items.length === 0) throw new Error("Order must have items");
  const user = db.findById("users", userId);
  if (!user) throw new Error("User not found");
  const total = items.reduce((sum, item) => sum + item.price, 0);
  if (total <= 0) throw new Error("Order total must be positive");
  const order = db.insert("orders", { userId, items, total });
  return order;
}

function getOrderById(id) {
  if (!id) throw new Error("ID is required");
  const order = db.findById("orders", id);
  if (!order) throw new Error("Order not found");
  return order;
}

function getOrdersByUser(userId) {
  if (!userId) throw new Error("User ID is required");
  return db.findAll("orders").filter((o) => o.userId === userId);
}

function cancelOrder(id) {
  if (!id) throw new Error("ID is required");
  const order = db.findById("orders", id);
  if (!order) throw new Error("Order not found");
  if (order.status === "cancelled") throw new Error("Order already cancelled");
  return db.update("orders", id, { status: "cancelled" });
}

module.exports = { createOrder, getOrderById, getOrdersByUser, cancelOrder };

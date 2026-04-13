class OrderRepository {
  constructor(db) { this.db = db; }
  save(data) { return this.db.insert("orders", data); }
  findById(id) { return this.db.findById("orders", id); }
  findByUser(userId) { return this.db.findAll("orders").filter((o) => o.userId === userId); }
  update(id, data) { return this.db.update("orders", id, data); }
}
module.exports = OrderRepository;

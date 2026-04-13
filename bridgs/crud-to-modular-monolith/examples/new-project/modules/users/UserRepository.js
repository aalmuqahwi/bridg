class UserRepository {
  constructor(db) { this.db = db; }
  save(data) { return this.db.insert("users", data); }
  findById(id) { return this.db.findById("users", id); }
  findAll() { return this.db.findAll("users"); }
  update(id, data) { return this.db.update("users", id, data); }
  delete(id) { return this.db.delete("users", id); }
}
module.exports = UserRepository;

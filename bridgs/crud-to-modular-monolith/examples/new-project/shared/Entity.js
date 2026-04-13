class Entity {
  constructor(id) { this.id = id; }
  equals(other) { if (!(other instanceof Entity)) return false; return this.id === other.id; }
}
module.exports = Entity;

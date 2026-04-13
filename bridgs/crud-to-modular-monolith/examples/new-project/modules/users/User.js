const Entity = require("../../shared/Entity");
class User extends Entity {
  constructor(id, name, email) { super(id); this.name = name; this.email = email; }
}
module.exports = User;

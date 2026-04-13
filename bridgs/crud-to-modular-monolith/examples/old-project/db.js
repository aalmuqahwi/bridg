const tables = { users: [], orders: [] };
let idCounter = 1;

const db = {
  insert(table, data) {
    const record = { id: idCounter++, ...data };
    tables[table].push(record);
    return record;
  },
  findById(table, id) {
    return tables[table].find((r) => r.id === id) || null;
  },
  findAll(table) {
    return tables[table];
  },
  update(table, id, data) {
    const index = tables[table].findIndex((r) => r.id === id);
    if (index === -1) throw new Error(`Record not found in ${table}`);
    tables[table][index] = { ...tables[table][index], ...data };
    return tables[table][index];
  },
  delete(table, id) {
    const index = tables[table].findIndex((r) => r.id === id);
    if (index === -1) throw new Error(`Record not found in ${table}`);
    tables[table].splice(index, 1);
    return true;
  },
};

module.exports = db;

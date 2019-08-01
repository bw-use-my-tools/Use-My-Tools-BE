const db = require("../dbConfig");

module.exports = {
  find,
  findBy,
  findById,
  create,
  remove,
  update
};

async function find() {
  return db("tools");
}
function findBy(filter) {
  return db("tools")
    .where(filter)
    .then(tools => dbToJs(tools));
}

async function findById(id) {
  const tool = await db("tools")
    .where({ id })
    .first();

  if (tool) {
    return Promise.resolve((tool));
  } else {
    return Promise.resolve(null);
  }
}


async function create(tool) {
  const [id] = await db("tools").insert(tool, "id");

  return findById(id);
}

function remove(id) {
  return db("tools")
    .where({ id })
    .del();
}

async function update(item, id) {
  const editedTool = await db("tools")
    .where({ id })
    .update(item);
  if (editedTool) {
    const tool = await findById(id);
    return tool;
  }
}

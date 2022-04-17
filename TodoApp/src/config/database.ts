const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");

let db: any;

export async function createConnection(dbName: string) {
  const adapter = new FileAsync(dbName);
  db = await low(adapter);
  db.defaults({ todos: [] }).write();
  console.info("Connected to the DB");
}

export const getConnection = () => db;

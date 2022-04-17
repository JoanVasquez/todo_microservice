const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");

let db: any;

export async function createConnection(dbName: string) {
  const adapter = new FileAsync(dbName);
  db = await low(adapter);
  db.defaults({ diplomas: [] }).write();
  console.log("Connected to the DB");
}

export const getConnection = () => db;

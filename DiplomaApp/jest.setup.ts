import { createConnection, getConnection } from "./src/config/database";

jest.mock("./src/nats.wrapper");

beforeAll(async () => {
  await createConnection("db_test.json");
});

afterEach(async () => {
  jest.clearAllMocks();
  await getConnection().get("diplomas").remove({}).write();
});

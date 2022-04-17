import supertest from "supertest";
import app from ".";

test("Testing 404", async () => {
  return supertest(app).get("/api/test").expect(404);
});

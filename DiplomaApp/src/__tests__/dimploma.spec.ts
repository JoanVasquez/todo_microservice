import supertest from "supertest";
import app from "..";
import { getConnection } from "../config/database";
import { Diploma } from "../model/Diploma";
import { v4 } from "uuid";
import DiplomaService from "../service/diploma.service";
import { container } from "tsyringe";

describe("Diplomas REST API TEST", () => {
  test("Testing find diploma by Id", async () => {
    const diploma: Diploma = {
      id: v4(),
      title: "test 1",
      description: "We want to congretulate you for finishing your task",
    };
    await getConnection().get("diplomas").push(diploma).write();

    const response = await supertest(app)
      .get(`/api/v1/diplomas/${diploma.id}`)
      .send(diploma)
      .expect(200);

    expect(response.body.title).toEqual(diploma.title);
  });

  test("Testing find todo by Id ==> Not Found", async () => {
    const diploma: Diploma = {
      id: v4(),
      title: "test 1",
      description: "We want to congretulate you for finishing your task",
    };

    await supertest(app)
      .get(`/api/v1/diplomas/${diploma.id}`)
      .send(diploma)
      .expect(404);
  });

  test("Testing find all todo", async () => {
    const diploma: Diploma = {
      id: v4(),
      title: "test 1",
      description: "We want to congretulate you for finishing your task",
    };
    await getConnection().get("diplomas").push(diploma).write();

    const response = await supertest(app)
      .get(`/api/v1/diplomas`)
      .send()
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  test("Testing creation of diploma", async () => {
    const diploma: Diploma = {
      id: v4(),
      title: "test 1",
      description: "We want to congretulate you for finishing your task",
    };

    const diplomaService: DiplomaService = container.resolve(DiplomaService);
    const savedData = await diplomaService.save(diploma);

    expect(diploma.title).toEqual(savedData.title);
  });
});

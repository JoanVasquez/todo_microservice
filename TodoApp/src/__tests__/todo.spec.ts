import supertest from "supertest";
import app from "..";
import { natsWrapper } from "../nats.wrapper";
import { getConnection } from "../config/database";
import { Todo } from "../model/Todo";
import { v4 } from "uuid";

describe("Todo REST API TEST", () => {
  test("Testing creation of todo ==> completed", async () => {
    let todos: Array<Todo> = getConnection().get("todos").value();
    expect(todos.length).toEqual(0);

    const todo: Todo = {
      id: v4(),
      title: "test 1",
      version: v4(),
    };

    const response = await supertest(app)
      .post("/api/v1/todos")
      .send(todo)
      .expect(201);

    expect(response.body.title).toEqual(todo.title);
  });

  test("Testing creation of todo ==> validation", async () => {
    const todo: Todo = {
      id: v4(),
      title: "",
      version: v4(),
    };

    await supertest(app).post("/api/v1/todos").send(todo).expect(400);
  });

  test("Testing updating a todo", async () => {
    const todo: Todo = {
      id: v4(),
      title: "test 1",
      isCompleted: false,
      version: v4(),
    };
    await getConnection().get("todos").push(todo).write();

    todo.isCompleted = true;
    const response = await supertest(app)
      .put("/api/v1/todos")
      .send(todo)
      .expect(200);

    expect(response.body.title).toEqual(todo.title);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });

  test("Testing updating a todo ==> not found", async () => {
    const todo: Todo = {
      id: v4(),
      title: "test 1",
      isCompleted: false,
      version: v4(),
    };

    await supertest(app).put("/api/v1/todos").send(todo).expect(404);
  });

  test("Testing find todo by Id", async () => {
    const todo: Todo = {
      id: v4(),
      title: "test 1",
      isCompleted: false,
      version: v4(),
    };
    await getConnection().get("todos").push(todo).write();

    const response = await supertest(app)
      .get(`/api/v1/todos/${todo.id}`)
      .send(todo)
      .expect(200);

    expect(response.body.title).toEqual(todo.title);
  });

  test("Testing find todo by Id ==> Not Found", async () => {
    const todo: Todo = {
      id: v4(),
      title: "test 1",
      isCompleted: false,
      version: v4(),
    };

    await supertest(app).get(`/api/v1/todos/${todo.id}`).send(todo).expect(404);
  });

  test("Testing find all todo", async () => {
    const todo: Todo = {
      id: v4(),
      title: "test 1",
      isCompleted: false,
      version: v4(),
    };

    await getConnection().get("todos").push(todo).write();

    const response = await supertest(app)
      .get(`/api/v1/todos`)
      .send()
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });
});

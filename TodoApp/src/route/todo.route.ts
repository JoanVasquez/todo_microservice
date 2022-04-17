import express, { Router } from "express";
import { container } from "tsyringe";
import TodoController from "../controller/todo.controller";
import { validateRequest } from "../middleware/exception.middleware";
import TodoService from "../service/todo.service";
import createOrUpdate from "../validation/todo.validation";

const router: Router = express.Router();
container.register("IService", { useClass: TodoService });
const todoController = container.resolve(TodoController);

router.get("/todos", todoController.findAll!);
router.get("/todos/:id", todoController.findById!);
router.post("/todos", createOrUpdate, validateRequest, todoController.save!);
router.put("/todos", createOrUpdate, validateRequest, todoController.update!);

export default router;

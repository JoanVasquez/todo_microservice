import express, { Router } from "express";
import { container } from "tsyringe";
import DiplomaController from "../controller/diploma.controller";
import DiplomaService from "../service/diploma.service";

const router: Router = express.Router();
container.register("IService", { useClass: DiplomaService });
const todoController = container.resolve(DiplomaController);

router.get("/diplomas", todoController.findAll!);
router.get("/diplomas/:id", todoController.findById!);

export default router;

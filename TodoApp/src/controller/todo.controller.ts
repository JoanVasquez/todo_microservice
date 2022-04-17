import { inject, injectable } from "tsyringe";
import IService from "../interface/IService";
import { Todo } from "../model/Todo";
import BaseController from "./base.controller";

@injectable()
export default class TodoController extends BaseController {
  constructor(@inject("IService") iService: IService<Todo>) {
    super(iService);
    //delete this.delete;
  }
}

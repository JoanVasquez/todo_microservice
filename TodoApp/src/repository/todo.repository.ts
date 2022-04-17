import { injectable } from "tsyringe";
import BaseRepository from "./base.repository";

@injectable()
export default class TodoRepository extends BaseRepository {
  constructor() {
    super("todos");
  }
}

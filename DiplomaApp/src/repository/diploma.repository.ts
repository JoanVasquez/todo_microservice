import { injectable } from "tsyringe";
import BaseRepository from "./base.repository";

@injectable()
export default class DiplomaRepository extends BaseRepository {
  constructor() {
    super("diplomas");
  }
}

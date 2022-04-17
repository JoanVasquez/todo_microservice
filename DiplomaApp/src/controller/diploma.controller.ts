import { inject, injectable } from "tsyringe";
import IService from "../interface/IService";
import { Diploma } from "../model/Diploma";
import BaseController from "./base.controller";

@injectable()
export default class DiplomaController extends BaseController {
  constructor(@inject("IService") iService: IService<Diploma>) {
    super(iService);
    //delete this.delete;
  }
}

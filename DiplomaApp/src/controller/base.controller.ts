import { NextFunction, Request, Response } from "express";
import IService from "../interface/IService";

export default class BaseController {
  constructor(private baseService: IService<any>) {}

  // save? = (req: Request, res: Response) => {
  //   const data: any = req.body;
  //   this.baseService
  //     .save(data)
  //     .then((newData) => res.status(201).send(newData));
  // };

  // update? = (req: Request, res: Response, next: NextFunction) => {
  //   const data: any = req.body;
  //   this.baseService
  //     .update(data)
  //     .then((updatedData) => res.status(200).send(updatedData))
  //     .catch((err) => next(err));
  // };

  // delete? = (req: Request, res: Response) => {
  //   const id: string = req.params.id;
  //   this.baseService.delete(id).then((result) => res.status(200).send(result));
  // };

  findById? = (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    this.baseService
      .findById(id)
      .then((data: any) => res.send(data))
      .catch((err) => next(err));
  };

  findAll? = (req: Request, res: Response) => {
    this.baseService.findAll().then((data: Array<any>) => res.send(data));
  };
}

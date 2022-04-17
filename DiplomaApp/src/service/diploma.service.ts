import { container, injectable } from "tsyringe";
import { Diploma } from "../model/Diploma";
import DiplomaRepository from "../repository/diploma.repository";
import IService from "../interface/IService";
import { throwError } from "../middleware/exception.middleware";

@injectable()
export default class DiplomaService
  implements Omit<IService<Diploma | any>, "update" | "delete">
{
  private diplomaRepository: DiplomaRepository =
    container.resolve(DiplomaRepository);

  async save(data: Diploma): Promise<any> {
    const savedData: Diploma = await this.diplomaRepository?.create(data)!;
    return savedData;
  }

  async findById(id: string): Promise<Diploma> {
    const diplomaFouund: Diploma = await this.diplomaRepository?.findById(id)!;

    if (!diplomaFouund) {
      throw throwError(404, "Diploma not found");
    }

    return diplomaFouund;
  }

  findAll(): Promise<Diploma[]> {
    return this.diplomaRepository?.findAll()!;
  }
}

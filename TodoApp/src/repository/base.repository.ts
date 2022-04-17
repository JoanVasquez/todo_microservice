import { v4 } from "uuid";
import { getConnection } from "../config/database";

export default abstract class BaseRepository {
  constructor(private schema: string) {}

  create = async (data: any): Promise<any> => {
    data.id = v4();
    data.version = v4();
    await getConnection().get(this.schema).push(data).write();
    return data;
  };

  update = async (data: any): Promise<any> => {
    const result = await getConnection()
      .get(this.schema)
      .find({ id: data.id })
      .assign(data)
      .value();
    return result;
  };

  // delete = async (id: string): Promise<any> => {
  //   const result = await getConnection()
  //     .get(this.schema)
  //     .remove({ id })
  //     .write();
  //   return result;
  // };

  findAll = async (): Promise<Array<any>> => {
    const entities = await getConnection().get(this.schema).value();
    return entities;
  };

  findById = async (id: string): Promise<any> => {
    const entity = await getConnection().get(this.schema).find({ id }).value();
    return entity;
  };
}

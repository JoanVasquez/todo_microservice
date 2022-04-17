import { container, injectable } from "tsyringe";
import { Todo } from "../model/Todo";
import TodoRepository from "../repository/todo.repository";
import { natsWrapper } from "../nats.wrapper";
import { TodoCompletedPublisher } from "../events/publisher/TodoCompletedPublisher";
import IService from "../interface/IService";
import { throwError } from "../middleware/exception.middleware";

@injectable()
export default class TodoService
  implements Omit<IService<Todo | any>, "delete">
{
  private todoRepository: TodoRepository = container.resolve(TodoRepository);

  async save(data: Todo): Promise<any> {
    data.isCompleted = false;
    const savedData: Todo = await this.todoRepository?.create(data)!;
    return savedData;
  }

  async update(data: Todo): Promise<any> {
    const foundTodo = await this.todoRepository.findById(data.id!);

    if (!foundTodo) {
      throw throwError(404, "Todo not found");
    }

    const updatedData: Todo = await this.todoRepository?.update(data);

    if (updatedData.isCompleted) {
      await new TodoCompletedPublisher(natsWrapper.client).publish({
        id: updatedData.id!,
        title: updatedData.title,
        isCompleted: updatedData.isCompleted,
        version: updatedData.version!,
      });
    }

    return updatedData;
  }

  async findById(id: string): Promise<Todo> {
    const todoFouund: Todo = await this.todoRepository?.findById(id)!;

    if (!todoFouund) {
      throw throwError(404, "Todo not found");
    }

    return todoFouund;
  }

  findAll(): Promise<Todo[]> {
    return this.todoRepository?.findAll()!;
  }
}

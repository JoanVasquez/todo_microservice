import { TodoCompletedEvent, Listener, Subjects } from "events/build";
import { Message } from "node-nats-streaming";
import { container } from "tsyringe";
import { v4 } from "uuid";
import { Diploma } from "../../model/Diploma";
import DiplomaService from "../../service/diploma.service";
import { queueGroupName } from "./queue-group-name";

export class TodoCompletedListener extends Listener<TodoCompletedEvent> {
  subject: Subjects.TodoCompleted = Subjects.TodoCompleted;
  queueGroupName: string = queueGroupName;

  private diplomaService: DiplomaService = container.resolve(DiplomaService);

  onMessage(data: TodoCompletedEvent["data"], msg: Message): void {
    const diploma: Diploma = {
      title: data.title,
      description: "We want to congretulate you for finishing your task",
      version: v4(),
    };

    this.diplomaService.save(diploma);

    msg.ack();
  }
}

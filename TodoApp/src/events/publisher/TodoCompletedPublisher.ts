import { Publisher, TodoCompletedEvent, Subjects } from "events/build";

export class TodoCompletedPublisher extends Publisher<TodoCompletedEvent> {
  subject: Subjects.TodoCompleted = Subjects.TodoCompleted;
}

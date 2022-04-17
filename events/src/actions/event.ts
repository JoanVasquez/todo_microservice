export enum Subjects {
  TodoCompleted = "todo:completed",
}

export interface Event {
  subject: Subjects;
  data: any;
}

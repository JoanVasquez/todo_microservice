import { Subjects } from "./event";

export interface TodoCompletedEvent {
  subject: Subjects;
  data: {
    id: string;
    version: string;
    title: string;
    isCompleted: boolean;
  };
}

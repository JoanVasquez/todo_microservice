import { Subjects } from "./event";

export interface DiplomaCreatedEvent {
  subject: Subjects;
  data: {
    id: string;
    version: string;
    title: string;
    description: string;
  };
}

import { signal } from "@angular/core";
import { TodoStatus } from "./todo.types";

export class Todo {
  
  id: number;
  status=signal<TodoStatus>('waiting');
  constructor(public name = '', public content = '', ) {
    this.id=Todo.generateId();
  }
  static idTrack=0;
  static generateId(){
    return Todo.idTrack++;
  }
  changeStatus(newStatus: TodoStatus) {
      this.status.set(newStatus);
    }
}

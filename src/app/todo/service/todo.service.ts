import { Injectable, inject, signal } from '@angular/core';
import { Todo } from '../model/todo';
import { LoggerService } from '../../services/logger.service';
import { TodoStatus } from '../model/todo.types';

let n = 1;

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private loggerService = inject(LoggerService);

  private todos = signal<Todo[]>([]);

  /**
   * elle retourne la liste des todos
   *
   * @returns Todo[]
   */
  getTodos(): Todo[] {
    console.log(this.todos())
    return this.todos();
    
  }

  /**
   *Elle permet d'ajouter un todo
   *
   * @param todo: Todo
   *
   */
  addTodo(todo: Todo): void {
    this.todos.update(todos => [...todos, todo]);
  }

  /**
   * Delete le todo s'il existe
   *
   * @param todo: Todo
   * @returns boolean
   */
  deleteTodo(todo: Todo) {
    const index = this.todos().indexOf(todo);
    console.log(todo)
    if (index > -1) {
      this.todos.set( [...this.todos().slice(0, index), ...this.todos().slice(index + 1)]);
      console.log(this.todos());
      return true;
    }
    return false;
  }

  /**
   * Logger la liste des todos
   */
  logTodos() {
    this.loggerService.logger(this.todos);
  }


  changeTodoStatus(todo:Todo, newStatus: TodoStatus) {
    todo.status.set(newStatus);
  }
}

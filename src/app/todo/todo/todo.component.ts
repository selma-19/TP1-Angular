import { Component, computed, inject, signal } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoService } from '../service/todo.service';

import { FormsModule } from '@angular/forms';
import { TodoListComponent } from '../todo-list/todoList.component';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css'],
    providers: [TodoService],
    standalone: true,
    imports: [FormsModule, TodoListComponent],
})
export class TodoComponent {
  private todoService = inject(TodoService);

  todos = signal<Todo[]>([]);
  todo = new Todo();
  constructor() {
    this.todos.set(this.todoService.getTodos());    
  }
  addTodo() {
    this.todoService.addTodo(this.todo);  
    this.todo = new Todo();
    this.todos.set(this.todoService.getTodos());
  }
  waitingTodos = computed(() => this.todos().filter(todo => todo.status() === 'waiting'));
  inProgressTodos = computed(() => this.todos().filter(todo => todo.status() === 'in progress'));
  doneTodos = computed(() => this.todos().filter(todo => todo.status() === 'done'));




}

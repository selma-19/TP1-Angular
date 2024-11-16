import { Component, Input, inject } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoStatus } from '../model/todo.types';
import { TodoElementComponent } from '../todo-element/todoElement.component';
import { CommonModule, NgClass } from '@angular/common';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo-list',
  imports:[TodoElementComponent,CommonModule],
  standalone: true,
  styleUrls: ['./todoList.component.css'],
  templateUrl:'./todoList.component.html' ,
})
export class TodoListComponent {
  private todoService = inject(TodoService);
  @Input() todos: Todo[] = [];
  @Input() status!: TodoStatus;
  onStatusChange(todo: Todo, val:string) {
    if (val==='next')
    {if (todo.status() === 'waiting') {
      todo.changeStatus('in progress');
    } else if (todo.status() === 'in progress') {
      todo.changeStatus('done');
    }}
    else if (val==='prev')
     {if (todo.status() === 'done') 
      todo.changeStatus('in progress');
        else if (todo.status() === 'in progress') 
        todo.changeStatus('waiting');
    }
    else if (val=='del')
      {this.todoService.deleteTodo(todo);
      this.todos=this.todoService.getTodos();
    }
  }
  }


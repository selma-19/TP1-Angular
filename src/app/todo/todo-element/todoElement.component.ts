import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoComponent } from '../todo/todo.component';
import { TodoService } from '../service/todo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-element',
  imports:[TodoComponent,CommonModule],
  templateUrl: './todoElement.component.html',
  standalone: true,

})
export class TodoElementComponent {
  @Input() todo!: Todo;
  @Output() statusChange = new EventEmitter();
  deleteTodo(todo: Todo) {
    this.statusChange.emit('del')
  }
  changeToPreviousStatus(todo: Todo) {
    this.statusChange.emit('prev')
  }
  changeToNextStatus(todo: Todo) {
    this.statusChange.emit('next')
  }

}

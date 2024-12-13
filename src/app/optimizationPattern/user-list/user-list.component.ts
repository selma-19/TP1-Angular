import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../users.service";
import {FormsModule} from '@angular/forms';
import {FiboPipe} from "../pipes/fibo-pipe";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    standalone: true,
    imports: [FormsModule,FiboPipe],
    changeDetection:ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  @Input() usersCluster: string = '';
  @Input() users: User[] = [];
  @Output() add = new EventEmitter<string>();
  userFullName: string = '';
  addUser() {
    this.add.emit(this.userFullName);
    this.userFullName = '';
  }
}

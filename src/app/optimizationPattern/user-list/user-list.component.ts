import {Component, Input, Output, EventEmitter} from '@angular/core';
import {User} from "../users.service";
import { FormsModule } from '@angular/forms';

const fibHashSet: any = {};
export const fibonnaci = (n: number): number => {
  if (n==1 || n==0) {
    return 1;
  }
  if(fibHashSet[n.toString()])
    return fibHashSet[n.toString()];
  
  const fibNumber = fibonnaci(n-1) + fibonnaci(n-2);
  fibHashSet[n.toString()] = fibNumber;
  return fibNumber;
}

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    standalone: true,
    imports: [FormsModule]
})
export class UserListComponent {
  @Input() usersCluster: string = '';
  @Input() type: string = '';
  @Input() users: User[] = [];
  @Output() add = new EventEmitter<string>();
  userFullName: string = '';
  addUser() {
    this.add.emit(this.userFullName);
    this.userFullName = '';
  }
  fibo(n: number): number {
    const fib = fibonnaci(n);

    return fib;
  }

  ngDoCheck() {
    console.log(this.type)
  }
}

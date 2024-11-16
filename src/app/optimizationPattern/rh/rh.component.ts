import { Component, OnInit, WritableSignal, effect, inject, signal } from '@angular/core';
import {User, UsersService} from "../users.service";
import * as ChartJs from 'chart.js/auto';
import { UserListComponent } from '../user-list/user-list.component';
@Component({
    selector: 'app-rh',
    templateUrl: './rh.component.html',
    styleUrls: ['./rh.component.css'],
    standalone: true,
    imports: [UserListComponent]
})
export class RhComponent implements OnInit {
  private userService = inject(UsersService);

  oddUsers: WritableSignal<User[]>;
  evenUsers: WritableSignal<User[]>;
  chart: any;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  constructor() {
    this.oddUsers = signal(this.userService.getOddOrEven(true));
    this.evenUsers = signal(this.userService.getOddOrEven());
    effect(() => {
      this.updateChart();
    })
  }

  ngOnInit(): void {
        this.createChart();
    }
  addUser(list: WritableSignal<User[]>, newUser: string) {
    this.userService.addUser(list, newUser);
  }
  createChart(){
    const data = [
      { users: 'Workers', count: this.oddUsers().length },
      { users: 'Boss', count: this.evenUsers().length },
    ];
    this.chart = new ChartJs.Chart("MyChart",
    {
      type: 'bar',
        data: {
          labels: data.map(row => row.users),
        datasets: [
        {
          label: 'Entreprise stats',
          data: data.map(row => row.count)
        }
      ]
    }
    });
  }

  updateChart(): void {
    const data = [
      { users: 'Workers', count: this.oddUsers().length },
      { users: 'Boss', count: this.evenUsers().length },
    ];
    this.chart.data.labels = data.map(row => row.users);
    this.chart.data.datasets[0].data = data.map(row => row.count);
    this.chart.update();
  }
}

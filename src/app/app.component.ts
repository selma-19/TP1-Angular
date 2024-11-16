import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import {TTCComponent} from "./components/ttc/ttc.component";
import { TodoComponent } from './todo/todo/todo.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
  imports: [NavbarComponent, RouterOutlet, TTCComponent,TodoComponent]
})
export class AppComponent {
  title = 'Starting Advanced Topics';
}

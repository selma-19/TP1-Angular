import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {RainbowDirective} from "./directives/rainbow-directive.directive";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
  imports: [NavbarComponent, RouterOutlet, FormsModule, RainbowDirective]
})
export class AppComponent {
  title = 'Starting Advanced Topics';
}

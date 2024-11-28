import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {RainbowDirective} from "./directives/rainbow-directive.directive";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
  imports: [NavbarComponent, RouterOutlet, FormsModule, RainbowDirective, MatProgressBar]
})
export class AppComponent {
  title = 'Starting Advanced Topics';
  isLoading = false;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.isLoading = false;
      }
    });
  }
}

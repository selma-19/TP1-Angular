import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";
import {FormsModule} from "@angular/forms";
import {RainbowDirective} from "../../directives/rainbow-directive.directive";

@Component({
  selector: 'app-rainbow',
  standalone: true,
  imports: [ RainbowDirective],
  templateUrl: './rainbow.component.html',
  styleUrl: './rainbow.component.css'
})
export class RainbowComponent {
  private router = inject(Router);

}

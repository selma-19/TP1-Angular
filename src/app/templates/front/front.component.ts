import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";
import {RainbowDirective} from "../../directives/rainbow-directive.directive";

@Component({
    selector: 'app-front',
    templateUrl: './front.component.html',
    styleUrls: ['./front.component.css'],
    standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, RainbowDirective]
})
export class FrontComponent {

}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {TodoComponent} from "./todo/todo.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [{path: '', component: TodoComponent}];


@NgModule({
  declarations: [TodoComponent], imports: [CommonModule, FormsModule, RouterModule.forChild(routes)]
})
export class TodoModule {
}

import {NgModule} from '@angular/core';
import {AsyncPipe, CommonModule, DatePipe, JsonPipe, NgClass, NgStyle, UpperCasePipe} from '@angular/common';
import {CvComponent} from "./cv/cv.component";
import {ListComponent} from "./list/list.component";
import {CvCardComponent} from "./cv-card/cv-card.component";
import {EmbaucheComponent} from "./embauche/embauche.component";
import {RouterLink, RouterModule, Routes} from "@angular/router";
import {DefaultImagePipe} from "./pipes/default-image.pipe";
import {DetailsCvComponent} from "./details-cv/details-cv.component";
import {ItemComponent} from "./item/item.component";
import {cvResolver} from "./cv/cv-resolver";
import {AddCvComponent} from "./add-cv/add-cv.component";
import {AuthGuard} from "../auth/guards/auth.guard";
import {AutocompleteComponent} from "./autocomplete/autocomplete.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: CvComponent, resolve: {cvs: cvResolver}}, {
  path: "add", component: AddCvComponent, canActivate: [AuthGuard]
}, {
  path: ":id", component: DetailsCvComponent
}];

@NgModule({
  declarations: [CvComponent, CvCardComponent, DetailsCvComponent, EmbaucheComponent, ItemComponent, ListComponent, AutocompleteComponent, AddCvComponent],
  imports: [JsonPipe, FormsModule, ReactiveFormsModule, RouterLink, DefaultImagePipe, CommonModule, NgClass, NgStyle, UpperCasePipe, DatePipe, AsyncPipe, RouterModule.forChild(routes)]
})
export class CvModule {
}

import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {TodoComponent} from "./todo/todo/todo.component";
import {MiniWordComponent} from "./directives/mini-word/mini-word.component";
import {ColorComponent} from "./components/color/color.component";
import {FrontComponent} from "./templates/front/front.component";
import {AdminComponent} from "./templates/admin/admin.component";
import {LoginComponent} from "./auth/login/login.component";
import {NF404Component} from "./components/nf404/nf404.component";
import {CvComponent} from "./cv/cv/cv.component";
import {RhComponent} from "./optimizationPattern/rh/rh.component";
import {cvResolver} from "./cv/cv/cv-resolver";
import {ProductsComponent} from "./products/products.component";
import {CustomPreloadingStrategy} from "./CustomPreloadingStrategy";

const routes: Route[] = [{path: "login", component: LoginComponent}, {path: "rh", component: RhComponent}, {
  path: "cv",
  loadChildren: () => import('./cv/cv.module').then(m => m.CvModule),
  data: {preload: true}
}, {
  path: "", component: FrontComponent, children: [{
    path: "todo", loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule), component: TodoComponent
  }, {path: "word", component: MiniWordComponent}],
}, {
  path: "admin", component: AdminComponent, children: [{path: "color", component: ColorComponent}],
}, {path: "products", component: ProductsComponent}, {path: "**", component: NF404Component}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: CustomPreloadingStrategy})],
  exports: [RouterModule],
  providers: [CustomPreloadingStrategy]
})
export class AppRoutingModule {
}

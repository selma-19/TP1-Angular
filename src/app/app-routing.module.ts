import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { NF404Component } from "./components/nf404/nf404.component";
import {APP_ROUTES} from "../config/routes.config";
import { AuthGuard } from "./auth/guards/auth.guard";
import {MasterDetailsCvComponent} from "./cv/master-details-cv/master-details-cv.component";
import {DetailsCvComponent} from "./cv/details-cv/details-cv.component";


const routes: Route[] = [
  { path: APP_ROUTES.login, component: LoginComponent },
  { path: APP_ROUTES.rh, loadComponent: () => import('./optimizationPattern/rh/rh.component').then(m => m.RhComponent), },
  {path:"cv/list",component:MasterDetailsCvComponent,children:
      [
        {path:":id",component:DetailsCvComponent}
      ]
  },
  {
    path: "cv",
    loadChildren: () => import("./cv/cv.routes").then(m => m.CV_ROUTES)
  },
  {
    path: APP_ROUTES.front,
    loadComponent: () => import("./templates/front/front.component").then(m => m.FrontComponent),
    children: [
      { path: APP_ROUTES.todo, loadComponent: () => import('./todo/todo/todo.component').then(m => m.TodoComponent) },
      { path: APP_ROUTES.word, loadComponent: () => import('./directives/mini-word/mini-word.component').then(m => m.MiniWordComponent) },
    ],
  },
  {
    path: "admin",
    canActivate: [AuthGuard],
    loadChildren: () => import("./templates/admin/admin.routes").then(m => m.ADMIN_ROUTES)
  },
  { path: APP_ROUTES.ttc, loadComponent: () => import('./components/ttc/ttc.component').then(m => m.TTCComponent), },
  { path: APP_ROUTES.rainbow, loadComponent: () => import('./components/rainbow/rainbow.component').then(m => m.RainbowComponent), },
  { path: APP_ROUTES.notFound, component: NF404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

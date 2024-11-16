import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { TodoComponent } from "./todo/todo/todo.component";
import { MiniWordComponent } from "./directives/mini-word/mini-word.component";
import { ColorComponent } from "./components/color/color.component";
import { FrontComponent } from "./templates/front/front.component";
import { AdminComponent } from "./templates/admin/admin.component";
import { LoginComponent } from "./auth/login/login.component";
import { NF404Component } from "./components/nf404/nf404.component";
import { AuthGuard } from "./auth/guards/auth.guard";
import { AddCvComponent } from "./cv/add-cv/add-cv.component";
import { CvComponent } from "./cv/cv/cv.component";
import { DetailsCvComponent } from "./cv/details-cv/details-cv.component";
import { RhComponent } from "./optimizationPattern/rh/rh.component";
import {TTCComponent} from "./components/ttc/ttc.component";
import {APP_ROUTES} from "../config/routes.config";
import {RainbowComponent} from "./components/rainbow/rainbow.component";

const routes: Route[] = [
  { path: APP_ROUTES.login, component: LoginComponent },
  { path: APP_ROUTES.rh, component: RhComponent },
  {
    path: APP_ROUTES.cv,
    component: CvComponent,
  },
  { path: APP_ROUTES.addCv, component: AddCvComponent, canActivate: [AuthGuard] },
  { path: APP_ROUTES.cvDetails, component: DetailsCvComponent },
  {
    path: APP_ROUTES.front,
    component: FrontComponent,
    children: [
      { path: APP_ROUTES.todo, component: TodoComponent },
      { path: APP_ROUTES.word, component: MiniWordComponent },
    ],
  },
  {
    path: APP_ROUTES.admin,
    component: AdminComponent,
    children: [{ path: APP_ROUTES.color, component: ColorComponent }],
  },
  { path: APP_ROUTES.ttc, component: TTCComponent },
  { path: APP_ROUTES.rainbow, component: RainbowComponent },
  { path: APP_ROUTES.notFound, component: NF404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

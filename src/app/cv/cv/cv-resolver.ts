import {ResolveFn} from "@angular/router";
import {Cv} from "../model/cv";
import {catchError, Observable, of} from "rxjs";
import {inject} from "@angular/core";
import {CvService} from "../services/cv.service";
import {ToastrService} from "ngx-toastr";

export const cvResolver: ResolveFn<Cv[]> = (
  route,
  state
): Observable<Cv[]> => {
  console.log("resolving...");
  const cvService = inject(CvService);
  const toastr=inject(ToastrService)
  return cvService.getCvs().pipe(
    catchError(() => {
      toastr.error(`
                Attention!! Les données sont fictives, problème avec le serveur.
                Veuillez contacter l'admin.`);
      return of(cvService.getFakeCvs());
    }));
};


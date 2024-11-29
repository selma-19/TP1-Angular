import {Component, inject, OnDestroy} from "@angular/core";
import {Cv} from "../model/cv";
import {LoggerService} from "../../services/logger.service";
import {ToastrService} from "ngx-toastr";
import {CvService} from "../services/cv.service";
import {ListComponent} from "../list/list.component";
import {CvCardComponent} from "../cv-card/cv-card.component";
import {EmbaucheComponent} from "../embauche/embauche.component";
import {AsyncPipe, DatePipe, UpperCasePipe} from "@angular/common";
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  Observable,
  of, tap,
} from "rxjs";
import {AutocompleteComponent} from "../autocomplete/autocomplete.component";
import {Router, RouterModule, RouterOutlet} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: "app-cv",
  templateUrl: "./master-details-cv.component.html",
  styleUrls: ["./master-details-cv.component.css"],
  standalone: true,
  imports: [ListComponent, CvCardComponent, EmbaucheComponent, UpperCasePipe, DatePipe, AsyncPipe, AutocompleteComponent, RouterOutlet,],
})
export class MasterDetailsCvComponent{
  cvs$: Observable<Cv[]>;
  filteredCvs$=new Observable<Cv[]>;
  filter$=new BehaviorSubject<string>('junior');
  date = new Date();
  private logger = inject(LoggerService);
  private toastr = inject(ToastrService);
  private cvService = inject(CvService);
  router=inject(Router)

  constructor() {
    this.cvs$ = this.cvService.getCvs().pipe(
      catchError(() => {
        this.toastr.error(`
                Attention!! Les données sont fictives, problème avec le serveur.
                Veuillez contacter l'admin.`);
        return of(this.cvService.getFakeCvs());
      }));
    this.logger.logger("je suis le cvComponent");
    this.toastr.info("Bienvenu dans notre CvTech");
    this.filteredCvs$=combineLatest([this.cvs$,this.filter$]).pipe(
      map(([cvs, ageFilter]) => {
        if (ageFilter === 'junior') {
          return cvs.filter((cv) => cv.age < 40);
        }
        return cvs.filter((cv) => cv.age >= 40);
      })
    )
    this.cvService.selectCv$.pipe(
      tap((cv)=>{
        this.router.navigate(['cv/list',cv.id])
      }),
      takeUntilDestroyed() //unsubscribe ondestroy
    ).subscribe()
  }
  filterCvs(age:string){
    this.filter$.next(age)
  }
}

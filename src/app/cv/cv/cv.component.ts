import {Component, inject} from "@angular/core";
import {Cv} from "../model/cv";
import {LoggerService} from "../../services/logger.service";
import {ToastrService} from "ngx-toastr";
import {CvService} from "../services/cv.service";
import {ListComponent} from "../list/list.component";
import {CvCardComponent} from "../cv-card/cv-card.component";
import {EmbaucheComponent} from "../embauche/embauche.component";
import {AsyncPipe, DatePipe, UpperCasePipe} from "@angular/common";
import {catchError, Observable, of} from "rxjs";

@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
  standalone: true,
  imports: [ListComponent, CvCardComponent, EmbaucheComponent, UpperCasePipe, DatePipe, AsyncPipe,],
})
export class CvComponent {
  cvs$: Observable<Cv[]>;
  selectedCv$: Observable<Cv>;
  date = new Date();
  private logger = inject(LoggerService);
  private toastr = inject(ToastrService);
  private cvService = inject(CvService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

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
    this.selectedCv$ = this.cvService.selectCv$;
  }
}


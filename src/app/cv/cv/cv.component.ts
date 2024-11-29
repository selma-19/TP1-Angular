import { Component, inject } from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { ListComponent } from "../list/list.component";
import { CvCardComponent } from "../cv-card/cv-card.component";
import { EmbaucheComponent } from "../embauche/embauche.component";
import {UpperCasePipe, DatePipe, AsyncPipe} from "@angular/common";
import { AutocompleteComponent } from "../autocomplete/autocomplete.component";
import {RouterOutlet} from "@angular/router";
import {Observable} from "rxjs";
@Component({
    selector: "app-cv",
    templateUrl: "./cv.component.html",
    styleUrls: ["./cv.component.css"],
    standalone: true,
  imports: [
    ListComponent,
    CvCardComponent,
    EmbaucheComponent,
    UpperCasePipe,
    DatePipe,
    AutocompleteComponent,
    RouterOutlet,
    AsyncPipe
  ],
})
export class CvComponent {
  private logger = inject(LoggerService);
  private toastr = inject(ToastrService);
  private cvService = inject(CvService);

  cvs: Cv[] = [];
  selectedCv$: Observable<Cv>;
  /*   selectedCv: Cv | null = null; */
  date = new Date();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.cvService.getCvs().subscribe({
      next: (cvs) => {
        this.cvs = cvs;
      },
      error: () => {
        this.cvs = this.cvService.getFakeCvs();
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
      },
    });
    this.logger.logger("je suis le cvComponent");
    this.toastr.info("Bienvenu dans notre CvTech");
    this.selectedCv$ = this.cvService.selectCv$;
  }
}

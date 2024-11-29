import {Component, inject} from "@angular/core";
import {Cv} from "../model/cv";
import {LoggerService} from "../../services/logger.service";
import {ToastrService} from "ngx-toastr";
import {CvService} from "../services/cv.service";
import {ListComponent} from "../list/list.component";
import {CvCardComponent} from "../cv-card/cv-card.component";
import {EmbaucheComponent} from "../embauche/embauche.component";
import {AsyncPipe, DatePipe, UpperCasePipe} from "@angular/common";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";

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
  loading$=new BehaviorSubject<boolean>(true)
  date = new Date();
  private logger = inject(LoggerService);
  private toastr = inject(ToastrService);
  private cvService = inject(CvService);
  private route=inject(ActivatedRoute)


  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.cvs$ = this.route.data.pipe(
      map((data) => data['cvs']),
      tap(()=>this.loading$.next(false))
    );
    this.logger.logger("je suis le cvComponent");
    this.toastr.info("Bienvenu dans notre CvTech");
    this.selectedCv$ = this.cvService.selectCv$;
    //TODO: seperate junior and senior cvs
  }
}


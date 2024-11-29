import {Component, inject} from "@angular/core";
import {Cv} from "../model/cv";
import {LoggerService} from "../../services/logger.service";
import {ToastrService} from "ngx-toastr";
import {CvService} from "../services/cv.service";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "app-cv", templateUrl: "./cv.component.html", styleUrls: ["./cv.component.css"],
})
export class CvComponent {
  cvs$: Observable<Cv[]>;
  selectedCv$: Observable<Cv>;
  loading$ = new BehaviorSubject<boolean>(true)
  date = new Date();
  private logger = inject(LoggerService);
  private toastr = inject(ToastrService);
  private cvService = inject(CvService);
  private route = inject(ActivatedRoute)

  constructor() {
    this.cvs$ = this.route.data.pipe(map((data) => data['cvs']), tap(() => this.loading$.next(false)));
    this.logger.logger("je suis le cvComponent");
    this.toastr.info("Bienvenu dans notre CvTech");
    this.selectedCv$ = this.cvService.selectCv$;
    //TODO: seperate junior and senior cvs
  }
}

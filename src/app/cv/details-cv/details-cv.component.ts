import {Component, inject, OnInit} from '@angular/core';
import {Cv} from '../model/cv';
import {CvService} from '../services/cv.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {APP_ROUTES} from '../../../config/routes.config';
import {AuthService} from '../../auth/services/auth.service';

import {DefaultImagePipe} from '../pipes/default-image.pipe';
import {catchError, EMPTY, Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-details-cv',
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.css'],
  standalone: true,
  imports: [DefaultImagePipe, AsyncPipe],
})
export class DetailsCvComponent implements OnInit {
  authService = inject(AuthService);
  cv$: Observable<Cv> | undefined;
  private cvService = inject(CvService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private toastr = inject(ToastrService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  constructor() {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.cv$ = this.cvService.getCvById(+id).pipe(catchError(() => {
      this.router.navigate([APP_ROUTES.cv]);
      return EMPTY;
    }));
  }

  deleteCv(cv: Cv) {
    this.cvService.deleteCvById(cv.id).pipe(catchError(() => {
      this.toastr.error(`Problème avec le serveur veuillez contacter l'admin`);
      return EMPTY;
    })).subscribe({
      next: () => {
        this.toastr.success(`${cv.name} supprimé avec succès`);
        this.router.navigate([APP_ROUTES.cv]);
      },
    });
  }
}

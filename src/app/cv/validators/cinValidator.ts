import {
    AbstractControl,
    AsyncValidator,
  } from '@angular/forms';
  import { of } from 'rxjs';
  import { map, catchError } from 'rxjs/operators';
  import { CvService } from '../services/cv.service';
  import { Injectable, inject } from '@angular/core';
  
  @Injectable({ providedIn: 'root' })
  export class cinAsyncValidator implements AsyncValidator {
    cvService = inject(CvService);
  
    validate(control: AbstractControl) {
      if (!control.value) {
        return of(null); 
      }
  
      return this.cvService.selectByProperty('cin', control.value).pipe(
        map((cvs) => {
          if (cvs.length === 0) {
            return null; 
          }
          return { customMessage: 'Invalid CIN format or taken CIN' }; 
        }),
        catchError(() => of({ customMessage: 'Validation failed due to a server error' }))
      );
    }
  }
  
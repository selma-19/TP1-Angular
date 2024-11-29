import { Component, inject } from "@angular/core";
import { FormBuilder, AbstractControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { catchError, debounceTime, distinctUntilChanged, Observable, of, switchMap, tap } from "rxjs";
import { CvService } from "../services/cv.service";
import { ItemComponent } from "../item/item.component";
import {AsyncPipe, CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
    selector: "app-autocomplete",
    templateUrl: "./autocomplete.component.html",
    styleUrls: ["./autocomplete.component.css"],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ItemComponent, AsyncPipe, RouterModule],
})
export class AutocompleteComponent {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);
  get search(): AbstractControl {
    return this.form.get("search")!;
  }

  form = this.formBuilder.group({
    search: [''],
  });
  filteredCvs$: Observable<any[]> = of([]);

  constructor() {
    this.filteredCvs$ = this.search.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      // You can remember this by the phrase switch to a new observable.
      switchMap((value) => {
        if (value) {
          return this.cvService.selectByName(value);
        } else {
          return of([]);
        }
      }),
      catchError((error) => {
        console.error('Error fetching CVs:', error);
        return of([]);
      })
    );
  }
}

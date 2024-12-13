import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import { AbstractControl, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CvService } from "../services/cv.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { APP_ROUTES } from "src/config/routes.config";
import { Cv } from "../model/cv";
import { JsonPipe } from "@angular/common";
import {debounceTime, filter, Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: "app-add-cv",
  templateUrl: "./add-cv.component.html",
  styleUrls: ["./add-cv.component.css"],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    JsonPipe
  ],
})
export class AddCvComponent implements OnInit, OnDestroy{
  private cvService = inject(CvService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private formBuilder = inject(FormBuilder);
  private unsubscribe$ = new Subject<void>()

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
  }
  ngOnInit(){
    this.age.valueChanges.pipe(
      tap((age)=>{
        if(age && age < 18) {
          this.form.get("path")?.disable()
        }
        else this.form.get("path")?.enable()
      }),
      takeUntil(this.unsubscribe$))
      .subscribe();

       
      const draft = localStorage.getItem("SavedDraft");
      const savedDraft = draft ? JSON.parse(draft) : {};
      //console.log(this.form.controls)
      Object.keys(this.form.controls).forEach((controlName) => {
        const control = this.form.get(controlName);
        control?.setValue(savedDraft[controlName] || null);
      });

      /*
      //to save the whole form if valid
      this.form.valueChanges.pipe(
        filter(()=>this.form.valid),
        takeUntil(this.unsubscribe$) 
      ).subscribe(val=>localStorage.setItem("SavedDraft",JSON.stringify(val)));
      */

      
      //to save each valid field
      Object.keys(this.form.controls).forEach((controlName) => {
        const control = this.form.get(controlName);
        if (control) {
          control.valueChanges.pipe(
            tap(() => {
              if (control.valid) {
                savedDraft[controlName] = control.value;
              } else {
                delete savedDraft[controlName];
              }
              localStorage.setItem("SavedDraft", JSON.stringify(savedDraft));
            }),
            takeUntil(this.unsubscribe$) 
          ).subscribe();
        }
      });

  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  form = this.formBuilder.group(
    {
      name: ["", Validators.required],
      firstname: ["", Validators.required],
      path: [""],
      job: ["", Validators.required],
      cin: [
        "",
        {
          validators: [Validators.required, Validators.pattern("[0-9]{8}")],
        },
      ],
      age: [
        0,
        {
          validators: [Validators.required],
        },
      ],
    },
  );

  addCv() {
    this.cvService.addCv(this.form?.value as Cv).subscribe({
      next: (cv) => {
        this.router.navigate([APP_ROUTES.cv]);
        this.toastr.success(`Le cv ${cv.firstname} ${cv.name}`);
      },
      error: (err) => {
        this.toastr.error(
          `Une erreur s'est produite, Veuillez contacter l'admin`
        );
      },
    });
  }

  get name(): AbstractControl {
    return this.form.get("name")!;
  }
  get firstname() {
    return this.form.get("firstname");
  }
  get age(): AbstractControl {
    return this.form.get("age")!;
  }
  get job() {
    return this.form.get("job");
  }
  get path() {
    return this.form.get("path");
  }
  get cin(): AbstractControl {
    return this.form.get("cin")!;
  }
}

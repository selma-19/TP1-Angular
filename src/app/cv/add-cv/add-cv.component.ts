import { Component, inject } from "@angular/core";
import { AbstractControl, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CvService } from "../services/cv.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { APP_ROUTES } from "src/config/routes.config";
import { Cv } from "../model/cv";
import { CommonModule, JsonPipe, KeyValue } from "@angular/common";
import { cinAsyncValidator } from "../validators/cinValidator";

@Component({
    selector: "app-add-cv",
    templateUrl: "./add-cv.component.html",
    styleUrls: ["./add-cv.component.css"],
    standalone: true,
    imports: [
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    CommonModule,
],
})
export class AddCvComponent {
  private cvService = inject(CvService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private formBuilder = inject(FormBuilder);
  private cinValidator = inject(cinAsyncValidator);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}
ngOnInit(): void {
  this.form.get('cin')?.valueChanges.subscribe((value) => {
    console.log('CIN value changed:', value);
    console.log('Form errors:', this.form.get('cin')?.errors);
  });
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
          asyncValidators: [this.cinValidator.validate.bind(this.cinValidator)],
          updateOn: "blur",
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

  getValidationMessage(error: KeyValue<string, any>): string | null {
    if (!error) {
      return null; // No errors
    }
  
    if (error.key === 'required' && error.value === true) {
      return 'This field is required.';
    }
  
    if (error.key === 'pattern') {
      return 'Please enter a valid format. (e.g., 8-digit number)';
    }
  
    return error.key === 'customMessage' ? error.value : 'Invalid input.';
  }

  addCv() {
    this.cvService.addCv(this.form.value as Cv).subscribe({
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

import {Component, inject} from "@angular/core";
import {AbstractControl, FormBuilder} from "@angular/forms";
import {CvService} from "../services/cv.service";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
})
export class AutocompleteComponent {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);
  form = this.formBuilder.group({search: [""]});

  get search(): AbstractControl {
    return this.form.get("search")!;
  }
}

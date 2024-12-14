import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";



export function cinAgeValidator() : ValidatorFn {

  return(control :AbstractControl):ValidationErrors  | null =>{


    const cin:string=control?.get('cin')?.value;
    const age=control?.get('age')?.value;
console.log("age",age,cin)
    if (age == null || cin==null || cin?.length <8) return null;

    const firstNumCin=parseInt(cin.substring(0, 2));

    const invalidCin : boolean = (age>=60 &&(firstNumCin>19||firstNumCin<0)) || (age<60 && firstNumCin <=19)

    return invalidCin ? { invalidCin: true  } : null;
  }

}

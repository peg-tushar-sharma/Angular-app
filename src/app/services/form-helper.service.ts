import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormHelperService {
  // returns true if form control is dirty and touched, user has navigated to it AND the value is required but was empty
  isRequiredError(formGroup: FormGroup, controlName: string) {
    return (
      formGroup.get(controlName)?.errors?.['required'] &&
      (formGroup.get(controlName)?.dirty || formGroup.get(controlName)?.touched)
    );
  }

  isPatternError(formGroup: FormGroup, controlName: string) {
    return (
      formGroup.get(controlName)?.errors?.['pattern'] &&
      (formGroup.get(controlName)?.dirty || formGroup.get(controlName)?.touched)
    );
  }

  isEmailValid(formGroup: FormGroup, controlName: string) {
    return (
      formGroup.get(controlName)?.errors?.['email'] &&
      (formGroup.get(controlName)?.dirty || formGroup.get(controlName)?.touched)
    );
  }

  isMaxValueExceeded(formGroup: FormGroup, controlName: string) {
    return (
      formGroup.get(controlName)?.errors?.['max'] &&
      (formGroup.get(controlName)?.dirty || formGroup.get(controlName)?.touched)
    );
  }
}

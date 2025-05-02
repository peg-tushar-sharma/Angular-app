import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FormHelperService } from 'src/app/services/form-helper.service';

@Component({
  selector: 'app-additional-details',
  templateUrl: './additional-details.component.html',
  styleUrls: ['./additional-details.component.css', '../product-form.css'],
})
export class AdditionalDetailsComponent {
  @Input() formGroupName!: string;
  additionalDetails!: FormGroup;

  constructor(
    private formGroupDirective: FormGroupDirective,
    private _formHelper: FormHelperService
  ) {}

  ngOnInit(): void {
    this.additionalDetails = this.formGroupDirective.control.get(this.formGroupName) as FormGroup;
  }

  get formHelper() {
    return this._formHelper;
  }

  toggleQuestion1(event: any) {
    const toggleValue = event.value;
    if (toggleValue) {
      this.additionalDetails.get('email')?.enable();
      this.additionalDetails.get('email')?.addValidators(Validators.required);
      this.additionalDetails.get('email')?.updateValueAndValidity();
    } else {
      this.additionalDetails.get('email')?.disable();
      this.additionalDetails.get('email')?.reset();
      this.additionalDetails.get('email')?.removeValidators(Validators.required);
      this.additionalDetails.get('email')?.updateValueAndValidity();
    }
  }
}

import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { categories, currencies, distributionChannels, dummyAcknowledgements } from './ref-data';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  currentYear = new Date(Date.now()).getFullYear();

  // only whole numbers without decimal places
  wholeNumbers = '^[0-9]*$';

  // decimals with optional 2 decimal digits that are separated by dot
  numTwoDecimalDigits = '^\\d+\\.?\\d{0,2}$';

  isSubmitBtnDisabled = false;

  submitFormResult = '';

  // ideally this should come from the backend
  allCategories = categories;
  allCurrencies = currencies;
  allDistributionChannels = distributionChannels;
  allAcknowledgements = dummyAcknowledgements;

  constructor(private fb: FormBuilder, private _formHelperService: FormHelperService) {}

  productForm = this.fb.group({
    productDetails: this.fb.group({
      productName: ['', Validators.required],
      price: [0, [Validators.required, Validators.pattern(this.numTwoDecimalDigits)]],
      currency: ['EUR', Validators.required],
      category: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.pattern(this.wholeNumbers)]],
      year: ['', [Validators.required, Validators.max(this.currentYear)]],
    }),
    additionalDetails: this.fb.group({
      productDescription: ['', Validators.required],
      notificationsQuestion1: [false, Validators.required],
      email: [{ value: '', disabled: true }, Validators.email],
    }),
    acknowledgements: this.fb.group({
      acknowledgementsFormArray: new FormArray([]),
    }),
    productConfig: this.fb.group({
      distributionChannel: [''],
      distributionChannelFields: this.fb.array([]) as FormArray<any>,
    }),
  });

  get formHelperService() {
    return this._formHelperService;
  }

  get productDetailsForm() {
    return this.productForm.get('productDetails') as FormGroup;
  }

  get additionalDetailsForm() {
    return this.productForm.get('additionalDetails') as FormGroup;
  }

  get acknowledgementsForm() {
    return this.productForm.get('acknowledgements') as FormGroup;
  }

  get productConfigForm() {
    return this.productForm.get('productConfig') as FormGroup;
  }

  /* 
  Return value should be of a type which is corresponding to the product
  To Do: create model interface
  */
  private initializeAttributes() {
    const product = {
      productName: this.productDetailsForm.get('productName')?.value,
      price: this.productDetailsForm.get('price')?.value,
      currency: this.productDetailsForm.get('currency')?.value,
      categories: this.productDetailsForm.get('category')?.value,
      quantity: this.productDetailsForm.get('quantity')?.value,
      year: this.productDetailsForm.get('year')?.value,
      productDescription: this.additionalDetailsForm.get('productDescription')?.value,
      notificationsQuestion1: this.additionalDetailsForm.get('notificationsQuestion1')?.value,
      email:
        this.additionalDetailsForm.get('notificationsQuestion1')?.value === true
          ? this.additionalDetailsForm.get('email')?.value
          : '',
      checks: this.acknowledgementsForm.get('acknowledgementsFormArray')?.value,
      distributionChannels: this.productConfigForm.get('distributionChannelFields')?.value,
    };

    return product;
  }

  submitForm() {
    const product = this.initializeAttributes();
    this.submitFormResult = JSON.stringify(product);
  }
}

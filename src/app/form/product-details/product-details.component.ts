import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { FormHelperService } from 'src/app/services/form-helper.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css', '../product-form.css'],
})
export class ProductDetailsComponent {
  @Input() categories!: Array<string>;
  @Input() currencies!: Array<string>;
  @Input() formGroupName!: string;
  productDetails!: FormGroup;

  constructor(
    private formGroupDirective: FormGroupDirective,
    private _formHelper: FormHelperService
  ) {}

  ngOnInit(): void {
    this.productDetails = this.formGroupDirective.control.get(this.formGroupName) as FormGroup;
  }

  get formHelper() {
    return this._formHelper;
  }

  toggleAllSelection(matOptionToggle: MatCheckbox, matSelect: MatSelect) {
    const check = matOptionToggle;
    if (check.checked === true) {
      matSelect.options.forEach((item: MatOption) => item.select());
    } else {
      matSelect.options.forEach((item: MatOption) => item.deselect());
    }
  }

  optionClick(selectAllCheckbox: MatCheckbox) {
    selectAllCheckbox.checked = false;
  }
}

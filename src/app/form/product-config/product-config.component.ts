import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { FormHelperService } from 'src/app/services/form-helper.service';

@Component({
  selector: 'app-product-config',
  templateUrl: './product-config.component.html',
  styleUrls: ['./product-config.component.css', '../product-form.css'],
})
export class ProductConfigComponent {
  @Input() distributionChannels!: Array<string>;
  @Input() formGroupName!: string;
  productConfig!: FormGroup;
  duplicateDistChannelAlert = false;

  dummyDistributionData = [
    {
      distributionChannel: 'E-commerce',
      field1: 'Some input',
      field2: 'Some input',
      isActive: true,
    },
    {
      distributionChannel: 'Direct Sale',
      field1: 'Some input',
      field2: 'Some input',
      isActive: true,
    },
  ];

  existingDistributionChannels: Array<string> = [];

  isAddBtnDisabled = true;

  constructor(
    private fb: FormBuilder,
    private formGroupDirective: FormGroupDirective,
    private _formHelper: FormHelperService
  ) {}

  get formHelper() {
    return this._formHelper;
  }

  get distributionChannelFields() {
    return this.productConfig.get('distributionChannelFields') as FormArray;
  }

  ngOnInit(): void {
    this.productConfig = this.formGroupDirective.control.get(this.formGroupName) as FormGroup;

    // setting some values in formArray
    this.dummyDistributionData.forEach((data) => {
      const config = this.fb.group({
        distributionChannel: data.distributionChannel,
        field1: data.field1,
        field2: data.field2,
        isActive: data.isActive,
      });

      this.distributionChannelFields.push(config);
      this.existingDistributionChannels.push(data.distributionChannel);
    });
  }

  addDistributionChannel() {
    const distChannelControl = this.productConfig.get('distributionChannel');

    if (this.existingDistributionChannels.includes(distChannelControl?.value)) {
      this.duplicateDistChannelAlert = true;
      // Using custom alert message instead of setErrors, otherwise submit button will be disabled on the last step
      // distChannelControl?.setErrors({ 'duplicate-dist-channel': true });
    } else {
      this.duplicateDistChannelAlert = false;
      // distChannelControl?.setErrors(null);
      this.existingDistributionChannels.push(distChannelControl?.value);

      const distChannelFields = this.fb.group({
        distributionChannel: distChannelControl?.value,
        field1: '',
        field2: '',
        isActive: false,
      });

      this.distributionChannelFields.push(distChannelFields);
    }
  }

  deleteDistributionChannel(i: number) {
    this.distributionChannelFields.removeAt(i);
    this.existingDistributionChannels.splice(i, 1);
  }

  onDistributionChannelChange() {
    if (this.formHelper.isRequiredError(this.productConfig, 'distributionChannel')) {
      this.isAddBtnDisabled = true;
    } else {
      this.isAddBtnDisabled = false;
    }
  }
}

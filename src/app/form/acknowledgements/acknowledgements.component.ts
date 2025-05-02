import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { FormHelperService } from 'src/app/services/form-helper.service';

@Component({
  selector: 'app-acknowledgements',
  templateUrl: './acknowledgements.component.html',
  styleUrls: ['./acknowledgements.component.css'],
})
export class AcknowledgementsComponent {
  @Input() dummyAcknowledgements!: Array<any>;
  @Input() formGroupName!: string;
  acknowledgements!: FormGroup;

  constructor(
    private formGroupDirective: FormGroupDirective,
    private _formHelper: FormHelperService
  ) {}

  ngOnInit(): void {
    this.acknowledgements = this.formGroupDirective.control.get(this.formGroupName) as FormGroup;
  }

  get formHelper() {
    return this._formHelper;
  }

  get ackFormArray() {
    return this.acknowledgements.get('acknowledgementsFormArray') as FormArray;
  }

  onCheckChange(event: any) {
    if (event.checked) {
      // push id and value of selected checkbox to formArray
      this.ackFormArray.push(new FormControl({ id: event.source.id, value: event.source.value }));
    } else {
      // remove checkbox from formArray
      for (let i = 0; i < this.ackFormArray.controls.length; i++) {
        const ctrl = this.ackFormArray.controls[i];
        if (ctrl.value.id === event.source.id) {
          this.ackFormArray.removeAt(i);
        }
      }
    }
  }
}

import { Component, input, output } from '@angular/core';
import { DeleteBtn } from '../../../shared/components/delete-btn/delete-btn';
import { FormArray, ReactiveFormsModule, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-option',
  imports: [DeleteBtn, ReactiveFormsModule],
  templateUrl: './create-option.component.html',
  styleUrl: './create-option.component.scss',
})
export class CreateOption {
  isVisible: boolean = false;
  questionIndex = input<number>();
  addOption = output<number>();
  options = input<FormArray>();
  deleteOption = output<number>();

  getTextControl(o: AbstractControl) {
    return o.get('text') as FormControl;
  }

  getLetter(i: number): string {
    return String.fromCharCode(65 + i);
  }

  showErrorMsg(event: Event) {
    let eventVar = event.target as HTMLInputElement;
    if (eventVar.value === '') {
      this.isVisible = true;
    } else {
      this.isVisible = false;
    }
  }
}

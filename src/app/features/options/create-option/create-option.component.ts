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
  optionErrors: boolean[] = [];

  getTextControl(o: AbstractControl) {
    return o.get('text') as FormControl;
  }

  getLetter(i: number): string {
    return String.fromCharCode(65 + i);
  }

  showErrorMsg(index: number) {
    const control = this.options()?.controls[index].get('text');
    this.optionErrors[index] = !control?.value?.trim();
  }

  onAddOption() {
    this.addOption.emit(this.questionIndex()!);
    this.optionErrors.push(true); // new empty field → show error
  }

  onDeleteOption(i: number) {
    this.deleteOption.emit(i);
    this.optionErrors.splice(i, 1);
  }

  showAllErrors() {
    this.optionErrors =
      this.options()?.controls.map((c) => {
        return !c.get('text')?.value?.trim();
      }) || [];
  }

  resetSurveyOptionErr() {
    this.optionErrors = [];
  }
}

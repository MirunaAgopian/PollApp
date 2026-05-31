import { Component, input, output } from '@angular/core';
import { DeleteBtn } from '../../../shared/components/delete-btn/delete-btn';
import { CreateOption } from '../../options/create-option/create-option.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-question',
  imports: [DeleteBtn, CreateOption, ReactiveFormsModule],
  templateUrl: './create-question.component.html',
  styleUrl: './create-question.component.scss',
})
export class CreateQuestion {
  isVisible: boolean = false;
  questionIndex = input<number>();
  questionGroup = input<any>();
  addOption = output<void>();
  deleteOption = output<number>();
  deleteQuestion = output<void>();

  showErrorMsg(event: Event) {
    let eventVar = event.target as HTMLInputElement;
    if (eventVar.value === '') {
      this.isVisible = true;
    } else {
      this.isVisible = false;
    }
  }

  getTextControl() {
    return this.questionGroup().get('text');
  }
}

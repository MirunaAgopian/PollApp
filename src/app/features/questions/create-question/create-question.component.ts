import { Component, input, output, ViewChild } from '@angular/core';
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
  @ViewChild('createOption') createOptionComponent!: CreateOption;

  showErrorMsg() {
    const control = this.getQuestionControl();
    this.isVisible = !control?.value?.trim();
  }

  resetSurveyQuestionErr() {
    this.isVisible = false;
    this.createOptionComponent.resetSurveyOptionErr();
  }

  showAllErrors() {
    const control = this.getQuestionControl();
    this.isVisible = !control.value?.trim();

    this.createOptionComponent.showAllErrors();
  }

  getTextControl() {
    return this.questionGroup().get('text');
  }

  get multipleAnswerControl() {
    return this.questionGroup().get('allow_multiple');
  }

  getQuestionControl() {
    return this.questionGroup().get('text');
  }
}

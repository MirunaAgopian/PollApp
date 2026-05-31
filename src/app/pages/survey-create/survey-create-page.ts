import { Component, inject, output } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { SurveyService } from '../../core/services/survey.service';
import { QuestionService } from '../../core/services/question.service';
import { OptionService } from '../../core/services/option.service';
import { Router } from '@angular/router';
import { CreateSurvey } from '../../features/surveys/create-survey/create-survey.component';
import { CreateQuestion } from '../../features/questions/create-question/create-question.component';

@Component({
  selector: 'app-survey-create-page',
  imports: [ReactiveFormsModule, CreateSurvey, CreateQuestion],
  templateUrl: './survey-create-page.html',
  styleUrl: './survey-create-page.scss',
})
export class SurveyCreatePage {
  surveyService = inject(SurveyService);
  questionService = inject(QuestionService);
  optionService = inject(OptionService);
  router = inject(Router);
  close = output<void>();

  surveyForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
    }),
    description: new FormControl(''),
    end_date: new FormControl(''),
    is_published: new FormControl(false),
    category: new FormControl('', {
      validators: [Validators.required],
    }),
    questions: new FormArray([]),
  });

  ngOnInit() {
    this.addQuestion();
  }

  get questionsArr() {
    return this.surveyForm.get('questions') as FormArray;
  }

  addQuestion() {
    const question = new FormGroup({
      order_index: new FormControl(this.questionsArr.length + 1),
      text: new FormControl('', Validators.required),
      allow_multiple: new FormControl(false),
      options: new FormArray([]),
    });
    this.questionsArr.push(question);
    const questionIndex = this.questionsArr.length - 1;
    this.addOption(questionIndex);
    this.addOption(questionIndex);
  }

  deleteQuestion(index: number) {
    if (this.questionsArr.length <= 1) {
      const question = this.questionsArr.at(index);
      question.get('text')?.setValue('');
      return;
    }
    this.questionsArr.removeAt(index);
    this.questionsArr.controls.forEach((q, i) => {
      q.get('order_index')?.setValue(i + 1);
    });
  }

  getOptionsArr(questionIndex: number) {
    return this.questionsArr.at(questionIndex).get('options') as FormArray;
  }

  addOption(questionIndex: number) {
    const optionsArr = this.getOptionsArr(questionIndex);
    if (optionsArr.length >= 6) return;
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F'];
    const option = new FormGroup({
      text: new FormControl('', Validators.required),
      order_index: new FormControl(alphabet[optionsArr.length]),
    });
    optionsArr.push(option);
  }

  deleteOption(questionIndex: number, optionIndex: number) {
    const optionsArr = this.getOptionsArr(questionIndex);
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F'];
    if (optionsArr.length <= 2) {
      const option = optionsArr.at(optionIndex);
      option.get('text')?.setValue('');
      return;
    }
    optionsArr.removeAt(optionIndex);
    optionsArr.controls.forEach((o, i) => {
      o.get('order_index')?.setValue(alphabet[i]);
    });
  }

  async submitSurvey() {
    if (this.surveyForm.invalid) return;
    const survey = await this.surveyService.insertSurvey(this.surveyForm.value);
    for (let q of this.surveyForm.value.questions! as any[]) {
      const question = await this.questionService.insertQuestion(q, survey.id);
      for (let o of q.options! as any[]) {
        await this.optionService.insertOptions(o, question.id);
      }
    }
    this.redirectToSurveyDetails(survey.id);
  }

  redirectToSurveyDetails(id: number) {
    this.router.navigate(['/survey', id]);
  }

  closeCreateSurveyModal() {
    this.close.emit();
  }

  //delete functions

  get titleControl(): FormControl {
    return this.surveyForm.get('title') as FormControl;
  }

  get datumControl(): FormControl {
    return this.surveyForm.get('end_date') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.surveyForm.get('description') as FormControl;
  }

  getOptions(q: AbstractControl): FormArray {
    return q.get('options') as FormArray;
  }

  onClearSurveyDatum() {
    this.surveyForm.get('end_date')!.setValue('');
  }

  onClearSurveyName() {
    this.surveyForm.get('title')!.setValue('');
  }

  onClearSurveyDescription() {
    this.surveyForm.get('description')!.setValue('');
  }
}

import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SurveyService } from '../../core/services/survey.service';
import { QuestionService } from '../../core/services/question.service';
import { OptionService } from '../../core/services/option.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-create-page',
  imports: [ReactiveFormsModule],
  templateUrl: './survey-create-page.html',
  styleUrl: './survey-create-page.scss',
})
export class SurveyCreatePage {
  surveyService = inject(SurveyService);
  quesionService = inject(QuestionService);
  optionService = inject(OptionService);
  router = inject(Router);

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

  surveyQuestionsForm = new FormGroup({
    order_index: new FormControl(1, {
      validators: [Validators.required],
    }),
    text: new FormControl('', {
      validators: [Validators.required],
    }),
    allow_multiple: new FormControl(false, {
      validators: [Validators.required],
    }),
    options: new FormArray([]),
  });

  surveyOptionsForm = new FormGroup({
    text: new FormControl('', {
      validators: [Validators.required],
    }),
    order_index: new FormControl('A', {
      validators: [Validators.required],
    }),
  });

  addQuestion() {
    let questionsArr = this.surveyForm.get('questions') as FormArray;
    let question = new FormGroup({
      order_index: new FormControl(questionsArr.length + 1),
      text: new FormControl(),
      allow_multiple: new FormControl(),
      options: new FormArray([]),
    });
    questionsArr.push(question);
  }

  removeQuestion(index: number) {
    let questionsArr = this.surveyForm.get('questions') as FormArray;
    if (questionsArr.length <= 1) return;
    questionsArr.removeAt(index);
    questionsArr.controls.forEach((q, i) => {
      q.get('order_index')?.setValue(i + 1);
    });
  }

  addOption() {
    let optionsArr = this.surveyQuestionsForm.get('options') as FormArray;
    if (optionsArr.length >= 6) return;
    let alphabet = ['A', 'B', 'C', 'D', 'E', 'F'];
    let option = new FormGroup({
      text: new FormControl(),
      order_index: new FormControl(alphabet[optionsArr.length]),
    });
    optionsArr.push(option);
  }

  removeOption(index: number) {
    let optionsArr = this.surveyQuestionsForm.get('options') as FormArray;
    let alphabet = ['A', 'B', 'C', 'D', 'E', 'F'];
    optionsArr.removeAt(index);
    optionsArr.controls.forEach((o, i) => {
      o.get('order_index')?.setValue(alphabet[i]);
    });
  }

  async submitSurvey() {
    const survey = await this.surveyService.insertSurvey(this.surveyForm.value);
    for (let q of this.surveyForm.value.questions! as any[]) {
      const question = await this.quesionService.insertQuestion(q, survey.id);

      for (let o of q.options! as any[]) {
        await this.optionService.insertOptions(o, question.id);
      }
    }
    this.redirectToSurveyDetails(survey.id);
  }

  redirectToSurveyDetails(id:number) {
    this.router.navigate(['/survey', id]);
  }
}

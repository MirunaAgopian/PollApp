import { Component, inject, output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SurveyService } from '../../core/services/survey.service';
import { QuestionService } from '../../core/services/question.service';
import { OptionService } from '../../core/services/option.service';
import { Router } from '@angular/router';
import { Dropdown } from '../../shared/components/dropdown/dropdown';
import { SURVEY_CATEGORIES } from '../../shared/constants/survey-categories';
import { DeleteBtn } from '../../shared/components/delete-btn/delete-btn';

@Component({
  selector: 'app-survey-create-page',
  imports: [ReactiveFormsModule, Dropdown, DeleteBtn],
  templateUrl: './survey-create-page.html',
  styleUrl: './survey-create-page.scss',
})
export class SurveyCreatePage {
  surveyService = inject(SurveyService);
  questionService = inject(QuestionService);
  optionService = inject(OptionService);
  router = inject(Router);
  categories = SURVEY_CATEGORIES;
  selectedCategory: string | null = null;
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
    this.addOption(this.questionsArr.length - 1);
  }

  removeQuestion(index: number) {
    if (this.questionsArr.length <= 1) return;
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

  removeOption(questionIndex: number, optionIndex: number) {
    const optionsArr = this.getOptionsArr(questionIndex);
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F'];
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
}

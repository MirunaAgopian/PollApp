import { Component, output, input } from '@angular/core';
import { Dropdown } from '../../../shared/components/dropdown/dropdown';
import { DeleteBtn } from '../../../shared/components/delete-btn/delete-btn';
import { SURVEY_CATEGORIES } from '../../../shared/constants/survey-categories';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-survey',
  imports: [Dropdown, DeleteBtn, ReactiveFormsModule],
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.scss',
})
export class CreateSurvey {
  categories = SURVEY_CATEGORIES;
  selectedCategory: string | null = null;
  isVisible: boolean = false;
  categoryErrorVisible: boolean = false;
  today = new Date().toISOString().split('T')[0];
  categoryControl = input<FormControl>();

  clearSurveyName = output<void>();
  titleControl = input.required<FormControl>();

  clearSurveyDatum = output<void>();
  datumControl = input.required<FormControl>();

  clearSurveyDesctiption = output<void>();
  descriptionControl = input.required<FormControl>();

  showErrorMsg() {
    const control = this.titleControl();
    this.isVisible = !control?.value?.trim();
  }

  resetSurveyNameErr() {
    this.isVisible = false;
  }

  resetCategory() {
    this.selectedCategory = '';
    this.categoryErrorVisible = false;
  }

  onCategorySelected(value: string | null) {
    this.selectedCategory = value;
    if (value) {
      this.categoryErrorVisible = false;
    }
  }

  showAllErrors() {
    const title = this.titleControl();
    const category = this.categoryControl();

    this.isVisible = !title?.value?.trim();
    this.categoryErrorVisible = !category?.value?.trim();
  }
}

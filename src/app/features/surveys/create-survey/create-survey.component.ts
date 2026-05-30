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
  today = new Date().toISOString().split('T')[0];

  clearSurveyName = output<void>();
  titleControl = input.required<FormControl>();

  clearSurveyDatum = output<void>();
  datumControl = input.required<FormControl>();

  clearSurveyDesctiption = output<void>();
  descriptionControl = input.required<FormControl>();

  showErrorMsg(event: Event) {
    let eventVar = event.target as HTMLInputElement;
    if (eventVar.value === '') {
      this.isVisible = true;
    } else {
      this.isVisible = false;
    }
  }

}

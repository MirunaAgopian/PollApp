import { Component } from '@angular/core';
import { Dropdown } from '../../../shared/components/dropdown/dropdown';
import { DeleteBtn } from '../../../shared/components/delete-btn/delete-btn';
import { SURVEY_CATEGORIES } from '../../../shared/constants/survey-categories';

@Component({
  selector: 'app-create-survey',
  imports: [Dropdown, DeleteBtn],
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.scss',
})
export class CreateSurvey {
  categories = SURVEY_CATEGORIES;
  selectedCategory: string | null = null;
  isVisible: boolean = false;
  today = new Date().toISOString().split('T')[0];

  showErrorMsg(event: Event) {
    let eventVar = event.target as HTMLInputElement;
    if (eventVar.value === '') {
      this.isVisible = true;
    } else {
      this.isVisible = false;
    }
  }
}

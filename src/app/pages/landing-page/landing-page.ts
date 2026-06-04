import { Component, ViewChild, ElementRef } from '@angular/core';
import { SurveyListComponent } from '../../features/surveys/survey-list/survey-list.component';
import { Dropdown } from '../../shared/components/dropdown/dropdown';
import { Dialog } from '../../shared/components/dialog/dialog';
import { SURVEY_CATEGORIES } from '../../shared/constants/survey-categories';
import { SurveyCreatePage } from '../survey-create/survey-create-page';

@Component({
  selector: 'app-landing-page',
  imports: [SurveyListComponent, Dropdown, SurveyCreatePage, Dialog],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  activeFilter: 'active' | 'past' = 'active';
  categories = SURVEY_CATEGORIES;
  selectedCategory: string | null = null;
  isCreateSurveyOpen = false;

  @ViewChild('createSurveyModal') modal!: ElementRef<HTMLDialogElement>;

  ngOnInit() {
    document.body.setAttribute('data-page', 'landing');
  }

  ngOnDestroy() {
    document.body.removeAttribute('data-page');
  }
  
  openCreateSurveyModal() {
    this.isCreateSurveyOpen = true;
  }
}

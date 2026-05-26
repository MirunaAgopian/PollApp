import { Component } from '@angular/core';
import { SurveyListComponent } from '../../features/surveys/survey-list/survey-list.component';
import { Dropdown } from '../../shared/components/dropdown/dropdown';
import { SURVEY_CATEGORIES } from '../../shared/constants/survey-categories';

@Component({
  selector: 'app-landing-page',
  imports: [SurveyListComponent, Dropdown],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  activeFilter: 'active' | 'past' = 'active';
  categories = SURVEY_CATEGORIES;
  selectedCategory: string | null = null;

  ngOnInit() {
    document.body.setAttribute('data-page', 'landing');
  }

  ngOnDestroy() {
    document.body.removeAttribute('data-page');
  }
}

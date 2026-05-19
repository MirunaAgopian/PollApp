import { Component } from '@angular/core';
import { SurveyList } from '../../features/surveys/survey-list/survey-list.component';

@Component({
  selector: 'app-landing-page',
  imports: [SurveyList],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  ngOnInit() {
    document.body.setAttribute('data-page', 'landing');
  }

  ngOnDestroy() {
    document.body.removeAttribute('data-page');
  }
}

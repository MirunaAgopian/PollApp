import { Component } from '@angular/core';
import { SurveyDetail } from '../../features/surveys/survey-detail/survey-detail.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-survey-page',
  imports: [SurveyDetail, RouterLink],
  templateUrl: './survey-page.html',
  styleUrl: './survey-page.scss',
})
export class SurveyPage {

}

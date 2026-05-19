import { Routes } from '@angular/router';
import { LandingPage } from '../app/pages/landing-page/landing-page';
import { SurveyDetail } from './features/surveys/survey-detail/survey-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
  },
  {
    path: 'survey/:id',
    component: SurveyDetail,//this should be changed with the surveyPageComponent
  },
];

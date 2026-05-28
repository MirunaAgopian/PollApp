import { Routes } from '@angular/router';
import { LandingPage } from '../app/pages/landing-page/landing-page';
import { SurveyPage } from '../app/pages/survey-page/survey-page'
import { SurveyCreatePage } from './pages/survey-create/survey-create-page';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
  },
  {
    path: 'survey/:id',
    component: SurveyPage,
  },
  //added temporary, only for styling
  {
    path: 'create-survey',
    component: SurveyCreatePage,
  },
];

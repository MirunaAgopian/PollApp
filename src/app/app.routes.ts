import { Routes } from '@angular/router';
import { SurveyDetail } from './features/surveys/survey-detail/survey-detail.component';

export const routes: Routes = [
  {
    path: 'survey/:id',
    component: SurveyDetail,
  },
];

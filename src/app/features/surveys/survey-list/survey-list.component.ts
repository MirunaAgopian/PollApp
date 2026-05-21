import { Component, inject, Input } from '@angular/core';
import { SurveyService } from '../../../core/services/survey.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-survey-list',
  imports: [RouterLink],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss',
})
export class SurveyList {
  surveyService = inject(SurveyService);
  surveyList = this.surveyService.surveys;
  @Input() filter: string | undefined;
  @Input() limit: number | undefined;
  @Input() sort: string | undefined;

  ngOnInit() {
    this.surveyService.getAllSurveys();
  }

  getfilteredSurveys() {
    let list = [...this.surveyList()];
    const now = new Date();

    switch (this.filter) {
      case 'ending-soon':
        list = list.filter((s) => new Date(s.end_date) > now);
        break;

      case 'past':
        list = list.filter((s) => new Date(s.end_date) < now);
        break;

      default:
        break;
    }

    if (this.sort === 'soonest-first') {
      list = list.sort((a, b) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime());
    }
    if (this.limit) {
      list = list.slice(0, this.limit);
    }
    //filtering
    switch (this.filter) {
      case 'ending-soon':
        list = list.filter((s) => new Date(s.end_date) > now);
        break;

      case 'active':
        list = list.filter((s) => new Date(s.end_date) >= now);
        break;

      case 'past':
        list = list.filter((s) => new Date(s.end_date) < now);
        break;

      default:
        break;
    }

    return list;
  }

  calculateRemainingDays(serverDate: string) {
    const surveyDate = new Date(serverDate);
    const today = new Date();
    const remainingDays = (surveyDate.getTime() - today.getTime()) / 86400000;
    const roundUpDays = Math.ceil(remainingDays);
    if (roundUpDays <= 0) {
      return 'Survey expired';
    } else {
      return `Ends in ${roundUpDays} days.`;
    }
  }
}

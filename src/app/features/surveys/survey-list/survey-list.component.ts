import { Component, inject, Input } from '@angular/core';
import { SurveyService } from '../../../core/services/survey.service';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import{ Survey } from '../../../core/interfaces/survey.interface'

@Component({
  selector: 'app-survey-list',
  imports: [RouterLink, NgClass],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss',
})
export class SurveyList {
  surveyService = inject(SurveyService);
  surveyList = this.surveyService.surveys;
  @Input() filter: string | undefined;
  @Input() limit: number | undefined;
  @Input() sort: string | undefined;
  @Input() secondaryStyle = false;

  ngOnInit() {
    this.surveyService.getAllSurveys();
  }


  private filterSurveys(list: Survey[]) {
  const now = new Date();

  switch (this.filter) {
    case 'ending-soon':
      return list.filter((s) => new Date(s.end_date) > now);

    case 'active':
      return list.filter((s) => new Date(s.end_date) >= now);

    case 'past':
      return list.filter((s) => new Date(s.end_date) < now);

    default:
      return list;
  }
}

private sortSurveys(list: Survey[]) {
  if (this.sort === 'soonest-first') {
    return list.sort(
      (a, b) =>
        new Date(a.end_date).getTime() - new Date(b.end_date).getTime()
    );
  }
  return list;
}

private limitSurveys(list: Survey[]) {
  return this.limit ? list.slice(0, this.limit) : list;
}

getfilteredSurveys() {
  let list = [...this.surveyList()];

  list = this.filterSurveys(list);
  list = this.sortSurveys(list);
  list = this.limitSurveys(list);

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

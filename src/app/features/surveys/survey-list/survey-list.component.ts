import { Component, inject, input } from '@angular/core';
import { SurveyService } from '../../../core/services/survey.service';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { Survey } from '../../../core/interfaces/survey.interface';

@Component({
  selector: 'app-survey-list',
  imports: [RouterLink, NgClass],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss',
})
export class SurveyListComponent {
  surveyService = inject(SurveyService);
  surveyList = this.surveyService.surveys;
  filter = input<string | undefined>();
  limit = input<number | undefined>();
  sort = input<string | undefined>();
  secondaryStyle = input(false);
  category = input<string | null>();

  ngOnInit() {
    this.surveyService.getAllSurveys();
  }

  private filterSurveys(list: Survey[]) {
    const today = this.normalize(new Date());

    switch (this.filter()) {
      case 'ending-soon':
        return list.filter((s) => new Date(s.end_date) >= today);

      case 'active':
        return list.filter((s) => new Date(s.end_date) >= today);

      case 'past':
        return list.filter((s) => new Date(s.end_date) < today);

      default:
        return list;
    }
  }

  private sortSurveys(list: Survey[]) {
    if (this.sort() === 'soonest-first') {
      return list.sort((a, b) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime());
    }
    return list;
  }

  private limitSurveys(list: Survey[]) {
    return this.limit ? list.slice(0, this.limit()) : list;
  }

  private normalize(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private filterByCategory(list: Survey[]) {
    const category = this.category();
    if (!category || category === 'All') {
      return list;
    }
    return list.filter((s) => s.category === category);
  }

  getfilteredSurveys() {
    let list = [...this.surveyList()];

    list = this.filterSurveys(list);
    list = this.filterByCategory(list);
    list = this.sortSurveys(list);
    list = this.limitSurveys(list);

    return list;
  }

  calculateRemainingDays(serverDate: string) {
    const surveyDate = new Date(serverDate);
    const today = new Date();
    const remainingDays = (surveyDate.getTime() - today.getTime()) / 86400000;
    const roundUpDays = Math.ceil(remainingDays);
    if (roundUpDays < 0) {
      return 'Survey expired';
    }
    if (roundUpDays === 0) {
      return 'Ends today';
    } else {
      return `Ends in ${roundUpDays} days.`;
    }
  }
}

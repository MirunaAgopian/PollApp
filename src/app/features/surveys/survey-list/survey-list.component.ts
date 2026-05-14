import { Component, inject } from '@angular/core';
import { SurveyService } from '../../../core/services/survey.service';

@Component({
  selector: 'app-survey-list',
  imports: [],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss',
})
export class SurveyList {
  //this variable accesses the service and
  // the injected service will be used to trigger the data load onInit()
  surveyService = inject(SurveyService);
  //this variable accesses the signal and
  // it is used in html to display the list of all surveys as such surveyList()
  surveyList = this.surveyService.surveys;

  ngOnInit(){
    this.surveyService.getAllSurveys();
  }

  calculateRemainingDays(serverDate:string) {
    const surveyDate = new Date(serverDate);
    const today = new Date();
    const remainingDays = (surveyDate.getTime() - today.getTime()) / 86400000;
    const roundUpDays = Math.ceil(remainingDays);
    if(roundUpDays <= 0){
      return "Survey expired";
    } else {
      return `Ends in ${roundUpDays} days.`;
    }
}

}
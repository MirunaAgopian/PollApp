import { Component, inject } from '@angular/core';
import { SurveyService } from '../../../core/services/survey.service';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../core/services/question.service';
import { QuestionItem } from '../../questions/question-item/question-item.component';

@Component({
  selector: 'app-survey-detail',
  imports: [QuestionItem],
  templateUrl: './survey-detail.component.html',
  styleUrl: './survey-detail.component.scss',
})
export class SurveyDetail {
  surveyService = inject(SurveyService);
  questionService = inject(QuestionService);

  surveyDetails = this.surveyService.singleSurvey;
  surveyQuestions = this.questionService.questions;

  private route = inject(ActivatedRoute);

  ngOnInit() {
    let currentId = String(this.route.snapshot.paramMap.get('id'));
    if (currentId) {
      this.surveyService.getSingleSurvey(currentId);
      this.questionService.getQuestionsForSurvey(currentId);
    }
  }

  getPublishLabel(): string {
    return this.surveyDetails()?.is_published ? 'Published' : 'Draft';
  }

  formatEndDate() {
    const serverDate = this.surveyDetails()?.end_date;
    if (!serverDate) return;
    const date = new Date(serverDate);
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  }
}

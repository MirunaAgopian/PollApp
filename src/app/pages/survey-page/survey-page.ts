import { Component, inject, } from '@angular/core';
import { SurveyDetail } from '../../features/surveys/survey-detail/survey-detail.component';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { VoteResults } from '../../features/votes/vote-results/vote-results.component';
import { OptionService } from '../../core/services/option.service';
import { VoteService } from '../../core/services/vote.service';
import { QuestionService } from '../../core/services/question.service';

@Component({
  selector: 'app-survey-page',
  imports: [SurveyDetail, RouterLink, VoteResults],
  templateUrl: './survey-page.html',
  styleUrl: './survey-page.scss',
})
export class SurveyPage {
  private route = inject(ActivatedRoute);
  questionService = inject(QuestionService);
  optionService = inject(OptionService);
  voteService = inject(VoteService);

  questions = this.questionService.questions;
  options = this.optionService.options;
  votes = this.voteService.votes;

  async ngOnInit() {
    const surveyId = this.route.snapshot.paramMap.get('id')!;
    await this.questionService.getQuestionsForSurvey(surveyId);
    await this.optionService.getOptionsForSurvey(surveyId);
    await this.voteService.getVotesForSurvey(surveyId);
  }

  optionsForQuestion(qId: number | string) {
    return this.options().filter((o) => o.question_id === qId);
  }

  votesForQuestion(qId: number | string) {
    return this.votes().filter((v) => v.question_id === qId);
  }

  hasVotes() {
    return this.votes().length > 0;
  }
}

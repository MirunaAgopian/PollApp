import { Component, inject } from '@angular/core';
import { SurveyDetail } from '../../features/surveys/survey-detail/survey-detail.component';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { VoteResults } from '../../features/votes/vote-results/vote-results.component';
import { OptionService } from '../../core/services/option.service';
import { VoteService } from '../../core/services/vote.service';
import { QuestionService } from '../../core/services/question.service';
import { SurveyService } from '../../core/services/survey.service';
import { Dialog } from '../../shared/components/dialog/dialog';
import { SurveyCreatePage } from '../survey-create/survey-create-page';

@Component({
  selector: 'app-survey-page',
  imports: [SurveyDetail, RouterLink, VoteResults, Dialog, SurveyCreatePage],
  templateUrl: './survey-page.html',
  styleUrl: './survey-page.scss',
})
export class SurveyPage {
  private route = inject(ActivatedRoute);
  questionService = inject(QuestionService);
  optionService = inject(OptionService);
  voteService = inject(VoteService);
  surveyService = inject(SurveyService);

  questions = this.questionService.questions;
  options = this.optionService.options;
  votes = this.voteService.votes;
  isPastSurvey: boolean = false;
  router = inject(Router);
  isCreateSurveyOpen:boolean = false;

  async ngOnInit() {
    const surveyId = this.route.snapshot.paramMap.get('id')!;
    await this.questionService.getQuestionsForSurvey(surveyId);
    await this.optionService.getOptionsForSurvey(surveyId);
    await this.voteService.getVotesForSurvey(surveyId);
    this.voteService.listenForVoteInserts();
  }

  ngOnDestroy(){
    this.voteService.stopListeningForVoteInterts();
  }

  //fixes runtime error for isPastSturvey
  async ngAfterViewInit() {
    const surveyId = this.route.snapshot.paramMap.get('id')!;
    const survey = await this.surveyService.getSingleSurvey(surveyId);
    if (survey) {
      setTimeout(() => {
        this.computeIsPast(survey.end_date);
      });
    }
  }

  private computeIsPast(endDate: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);
    this.isPastSurvey = end < today;
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

  completeSurvey(){
    this.router.navigate(['/']);
  }

  openCreateSurveyModal() {
    this.isCreateSurveyOpen = true;
  }
}

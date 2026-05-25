import { Component, inject } from '@angular/core';
import { SurveyDetail } from '../../features/surveys/survey-detail/survey-detail.component';
import { RouterLink } from '@angular/router';
import { VoteResults } from '../../features/votes/vote-results/vote-results.component';
import { OptionService } from '../../core/services/option.service';
import { VoteService } from '../../core/services/vote.service';
import { Question } from '../../core/interfaces/question.interface';
import { Option } from '../../core/interfaces/option.interface';
import { Vote } from '../../core/interfaces/vote.interface';

@Component({
  selector: 'app-survey-page',
  imports: [SurveyDetail, RouterLink, VoteResults],
  templateUrl: './survey-page.html',
  styleUrl: './survey-page.scss',
})
export class SurveyPage {
  optionService = inject(OptionService);
  voteService = inject(VoteService);
  question!: Question;
  options: Option[] = [];
  votes: Vote[] = [];

  questionId!: string;

  onQuestionSelected(id: string) {
    this.questionId = id;
    this.optionService.getOptionsForQuestion(id);
    this.options = this.optionService.options();
    this.voteService.getVotesForQuestion(id);
    this.votes = this.voteService.votes();
  }
}

import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//test, also inject is from the test!
import { SurveyService } from './core/services/survey.service';
import { QuestionService } from './core/services/question.service';
import { OptionService } from './core/services/option.service';
import { VoteService } from './core/services/vote.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('PollApp');
  //TEST for GET-Functions
  testSurveyVariable = inject(SurveyService);
  testQuestionVariable = inject(QuestionService);
  testOptionVariable = inject(OptionService);
  testVoteVariable = inject(VoteService);
  async ngOnInit() {
    // 1. Load the test survey (optional)
  await this.testSurveyVariable.getSingleSurvey('1');

  // 2. Load the questions for survey 1
  await this.testQuestionVariable.getQuestionsForSurvey('1');

  // 3. Get the first question
  const q = this.testQuestionVariable.questions()[0];
  if (!q) return;

  // 4. Load the options for that question
  await this.testOptionVariable.getOptionsForQuestion(q.id.toString());

  // 5. Load votes for first option
  const secondOption = this.testOptionVariable.options()[1];
  if (!secondOption) return;

  await this.testVoteVariable.getVotesForOption(secondOption.id.toString());

  //TESTS for INTSERT-Functions
  // this.testSurveyVariable.insertSurvey(); - this works!
  
  }
}

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SurveyList } from './features/surveys/survey-list/survey-list.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SurveyList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('PollApp');
}

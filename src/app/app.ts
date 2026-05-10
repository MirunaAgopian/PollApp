import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//test, also inject is from the test!
import { SurveyService } from './core/services/survey.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('PollApp');
  //test
  testSurveyVariable = inject(SurveyService);
  ngOnInit(){
      this.testSurveyVariable.getSingleSurvey("1");
  }
}

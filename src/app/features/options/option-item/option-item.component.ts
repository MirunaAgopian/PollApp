import { Component, inject, input, output, signal } from '@angular/core';
import { Option } from '../../../core/interfaces/option.interface';
import { VoteService } from '../../../core/services/vote.service';

@Component({
  selector: 'app-option-item',
  imports: [],
  templateUrl: './option-item.component.html',
  styleUrl: './option-item.component.scss',
})
export class OptionItem {
  option = input.required<Option>();
  isPastSurvey = input<boolean>(false);
  voteService = inject(VoteService);
  questionId = input.required<string>();
  isChecked = input<boolean>(false);
  clicked = output<string>();


  submitVote(optionId: string) {
  this.clicked.emit(optionId); 
}
}

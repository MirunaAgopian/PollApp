import { Component, input, output } from '@angular/core';
import { Option } from '../../../core/interfaces/option.interface';


@Component({
  selector: 'app-option-item',
  imports: [],
  templateUrl: './option-item.component.html',
  styleUrl: './option-item.component.scss',
})
export class OptionItem {
  option = input.required<Option>();
  vote = output<Option>();
  isPastSurvey = input<boolean>(false);

  onVoteClick() {
    this.vote.emit(this.option());
  }
}

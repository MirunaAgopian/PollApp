import { Component, Input } from '@angular/core';
import { PercentagePipe } from '../../../shared/pipes/percentage-pipe';
import { Question } from '../../../core/interfaces/question.interface';
import { Option } from '../../../core/interfaces/option.interface';

@Component({
  selector: 'app-vote-results',
  imports: [PercentagePipe],
  standalone: true,
  templateUrl: './vote-results.component.html',
  styleUrl: './vote-results.component.scss',
})
export class VoteResults {
  @Input() voteCount!: number;
  @Input() totalVotes!: number;
  @Input() question! : Question;
  @Input() options! : Option[];

  computeVotesToPercentages(){
    if(this.totalVotes === 0) {
      return 0;
    } else {
      return (this.voteCount / this.totalVotes) * 100;
    }
  }

}

import { Component, Input } from '@angular/core';
import { PercentagePipe } from '../../../shared/pipes/percentage-pipe';

@Component({
  selector: 'app-vote-results',
  imports: [PercentagePipe],
  templateUrl: './vote-results.component.html',
  styleUrl: './vote-results.component.scss',
})
export class VoteResults {
  @Input() voteCount!: number;
  @Input() totalVotes!: number;

  computeVotesToPercentages(){
    if(this.totalVotes === 0) {
      return 0;
    } else {
      return (this.voteCount / this.totalVotes) * 100;
    }
  }

}

import { Component, input } from '@angular/core';
import { PercentagePipe } from '../../../shared/pipes/percentage-pipe';
import { Question } from '../../../core/interfaces/question.interface';
import { Option } from '../../../core/interfaces/option.interface';
import { Vote } from '../../../core/interfaces/vote.interface';

@Component({
  selector: 'app-vote-results',
  imports: [PercentagePipe],
  standalone: true,
  templateUrl: './vote-results.component.html',
  styleUrl: './vote-results.component.scss',
})
export class VoteResults {
  options = input.required<Option[]>();
  votes = input.required<Vote[]>();
  question = input<Question | null>(null);

  getTotalVotes() {
    let totalVotes = this.votes().length;
    return totalVotes;
  }

  getVotesPerOption(optionId: string) {
    let filteredVotes = this.votes().filter((vote) => vote.option_id === optionId);
    return filteredVotes.length;
  }

  computeVotesToPercentages(optionId: string) {
    if (this.getTotalVotes() === 0) {
      return 0;
    }
    return (this.getVotesPerOption(optionId) / this.getTotalVotes()) * 100;
  }

  trackById(index: number, item: Option) {
    return item.id;
  }
}

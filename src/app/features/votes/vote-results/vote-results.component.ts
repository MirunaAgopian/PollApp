import { Component, Input } from '@angular/core';
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
  @Input() options!: Option[];
  @Input() votes!: Vote[];
  @Input() question: Question | null = null;
  // @Input() questionId!: string;

  getTotalVotes() {
    let totalVotes = this.votes.length;
    return totalVotes;
  }

  getVotesPerOption(optionId: string) {
    let filteredVotes = this.votes.filter((vote) => vote.option_id === optionId);
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

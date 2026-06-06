import { Component, input } from '@angular/core';
import { PercentagePipe } from '../../../shared/pipes/percentage-pipe';
import { Question } from '../../../core/interfaces/question.interface';
import { Option } from '../../../core/interfaces/option.interface';
import { Vote } from '../../../core/interfaces/vote.interface';

/**
 * Displays the vote results for a single question.
 * Shows each option with its percentage and total vote count.
 *
 * Inputs:
 * - options: The list of options belonging to the question.
 * - votes: All votes for this question.
 * - question: The question data (optional).
 *
 * Notes:
 * - Calculates total votes, votes per option, and percentages.
 * - Used on the survey detail page to show results after voting.
 */
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

  /**
   * Returns the total number of votes for this question.
   */
  getTotalVotes() {
    let totalVotes = this.votes().length;
    return totalVotes;
  }
  /**
   * Counts how many votes belong to a specific answer option.
   */
  getVotesPerOption(optionId: string) {
    let filteredVotes = this.votes().filter((vote) => vote.option_id === optionId);
    return filteredVotes.length;
  }

  /**
   * Calculates the percentage of votes for a specific option.
   * Returns 0 if there are no votes.
   */
  computeVotesToPercentages(optionId: string) {
    if (this.getTotalVotes() === 0) {
      return 0;
    }
    return (this.getVotesPerOption(optionId) / this.getTotalVotes()) * 100;
  }
}

import { Component, Input } from '@angular/core';
import { Vote } from '../../../core/interfaces/vote.interface';
import { Option } from '../../../core/interfaces/option.interface';

@Component({
  selector: 'app-vote-results',
  imports: [],
  templateUrl: './vote-results.component.html',
  styleUrl: './vote-results.component.scss',
})
export class VoteResults {
  @Input() votes!: Vote[];
  @Input() option!: Option;

  voteCount = this.votes.length; 

}

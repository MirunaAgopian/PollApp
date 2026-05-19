import { Component, inject, input, Input, signal } from '@angular/core';
import { Option } from '../../../core/interfaces/option.interface';
import { Vote } from '../../../core/interfaces/vote.interface';
import { VoteService } from '../../../core/services/vote.service';
import { supabase } from '../../../core/services/supabase.client';
import { RealtimeChannel } from '@supabase/supabase-js';

@Component({
  selector: 'app-option-item',
  imports: [],
  templateUrl: './option-item.component.html',
  styleUrl: './option-item.component.scss',
})

export class OptionItem {
  @Input() option!: Option;
  @Input() totalVotesFromQuestion! : number;
  voteService = inject(VoteService);
  votes = signal<Vote[]>([]);
  private voteChannel: RealtimeChannel | null = null;

  async ngOnInit() {
    const initialVotes = await this.voteService.getVotesForOption(this.option.id);
    this.votes.set(initialVotes);
    this.listenForVoteInserts(this.option.id);
  }

  listenForVoteInserts(optionId: string) {
    this.voteChannel = supabase
      .channel(`votes-channel-${optionId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'votes', filter: `option_id=eq.${optionId}` },
        (payload) => {
          const newVote = payload.new as Vote;
            this.votes.update((v) => [...v, newVote]);
        },
      )
      .subscribe();
  }

  stopListeningForVoteInserts() {
    if (this.voteChannel) {
      this.voteChannel.unsubscribe();
      this.voteChannel = null;
    }
  }

  getVoteCount(){
    return this.votes().length;
  }
}

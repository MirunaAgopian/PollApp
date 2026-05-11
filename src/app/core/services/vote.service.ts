import { Injectable, signal } from '@angular/core';
import { Vote } from '../interfaces/vote.interface';
import { supabase } from './supabase.client';
import { RealtimeChannel } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  votes = signal<Vote[]>([]);
  voteChannel: RealtimeChannel | null = null;

  async getVotesForOption(optionId: string) {
    try {
      let { data: votes, error } = await supabase
        .from('votes')
        .select('*')
        .eq('option_id', optionId);
      if (error) console.error('getVotesForOption error:', error);
      this.votes.set(votes ?? ([] as Vote[]));
    } catch (err) {
      console.error('Unexpected error in getVotesForOption:', err);
    }
  }

  subscribeToVotes(optionId: string) {
    this.voteChannel = supabase
      .channel('votes-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'votes' }, (payload) => {
        const newVote = payload.new as Vote;
        if (newVote.option_id === optionId) {
          this.votes.update((v) => [...v, newVote]);
        }
      })
      .subscribe();
  }

  unsubscribeFromVotes() {
    if (this.voteChannel) {
      this.voteChannel.unsubscribe();
      this.voteChannel = null;
    }
  }

  //both subscribeToVotes and unsubscribeFromVotes must be called later in their
  //respective component!
}

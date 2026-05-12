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
      if (error) console.error('Supabase error at getVotesForOption:', error);
      this.votes.set(votes ?? ([] as Vote[]));
    } catch (err) {
      console.error('Unexpected JS runtime error at getVotesForOption:', err);
    }
  }

  async insertVote() {
    try {
      const { data, error } = await supabase
        .from('votes')
        .insert(
          //TEST
          {
            question_id: 1,
            option_id: 3
          }
          //TEST
        )
        .select();
        if(error){
          console.error("Supabase error at insertVotes:", error);
        }
    } catch (err) {
      console.error("Unexpected JS runtime error at insertVotes", err);
    }
  }

  listenForVoteInserts(optionId: string) {
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

  stopListeningForVoteInserts() {
    if (this.voteChannel) {
      this.voteChannel.unsubscribe();
      this.voteChannel = null;
    }
  }
}

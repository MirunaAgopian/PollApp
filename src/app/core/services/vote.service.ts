import { Injectable, signal } from '@angular/core';
import { Vote } from '../interfaces/vote.interface';
import { supabase } from './supabase.client';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  async getVotesForOption(optionId: string): Promise<Vote[]> {
    try {
      let { data: votes, error } = await supabase
        .from('votes')
        .select('*')
        .eq('option_id', optionId);
      if (error) {
        console.error('Supabase error at getVotesForOption:', error);
      }
      return votes ?? [];
    } catch (err) {
      console.error('Unexpected JS runtime error at getVotesForOption:', err);
      return [];
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
            option_id: 3,
          },
          //TEST
        )
        .select();
      if (error) {
        console.error('Supabase error at insertVotes:', error);
      }
    } catch (err) {
      console.error('Unexpected JS runtime error at insertVotes', err);
    }
  }
}

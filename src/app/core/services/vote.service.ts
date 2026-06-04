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

  // USED BY QuestionItem (left side of survey-page)
  async getVotesForQuestion(questionId: string) {
    const { data, error } = await supabase.from('votes').select('*').eq('question_id', questionId);
    if (!error) {
      this.votes.set(data ?? []);
    }
  }

  // USED BY OptionItem (left side of survey-page)
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

  // USED BY SurveyPage (right side)
  async getVotesForSurvey(surveyId: string) {
    try {
      const { data, error } = await supabase
        .from('votes')
        .select('*, questions!inner(survey_id)')
        .eq('questions.survey_id', surveyId);

      if (error) {
        console.error('getVotesForSurvey error:', error);
        this.votes.set([]);
        return;
      }

      this.votes.set((data as Vote[]) ?? []);
    } catch (err) {
      console.error('Unexpected JS runtime error at getVotesForSurvey:', err);
      this.votes.set([]);
    }
  }

  async insertVote(questionId: string, optionIds: string[]) {
    try {
      const payload = optionIds.map((optionId) => ({
        questionId: questionId,
        optionId: optionId,
      }));
      const { data, error } = await supabase.from('votes').insert(payload).select();
      if (error) {
        console.error('Supabase error at insertVotes:', error);
      }
    } catch (err) {
      console.error('Unexpected JS runtime error at insertVotes', err);
    }
  }

  listenForVoteInserts() {
    this.voteChannel = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'votes' },
        (payload) => {
          const newVote = payload.new as Vote;
          this.votes.update((current) => [...current, newVote]);
        },
      )
      .subscribe();
  }

  stopListeningForVoteInterts(){
    if(this.voteChannel){
      this.voteChannel.unsubscribe();
      this.voteChannel = null;
    }
  }
}

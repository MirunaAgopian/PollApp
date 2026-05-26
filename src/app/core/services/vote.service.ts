import { Injectable, signal } from '@angular/core';
import { Vote } from '../interfaces/vote.interface';
import { supabase } from './supabase.client';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  votes = signal<Vote[]>([]);

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

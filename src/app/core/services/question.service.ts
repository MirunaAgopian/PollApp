import { Injectable, signal } from '@angular/core';
import { Question } from '../interfaces/question.interface';
import { supabase } from './supabase.client';
import { RealtimeChannel } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})

export class QuestionService {
  questions = signal<Question[]>([]);
  questionChannel: RealtimeChannel | null = null;

  async getQuestionsForSurvey(surveyId: string) {
    try {
      let { data: questions, error } = await supabase
        .from('questions')
        .select('*')
        .eq('survey_id', surveyId);
      if (error) console.error('getQuestionsForSurvey error:', error);
      this.questions.set(questions ?? ([] as Question[]));
    } catch (err) {
      console.error('Unexpected error in getQuestionsForSurvey', err);
    }
  }

  async insertQuestion() {
    try {
      const { data, error } = await supabase
        .from('questions')
        .insert(
          //TEST - values to be updated!
          {
            survey_id: 1, //this value should be rplaced dynamically
            text: 'Ist this a test question from VS code?',
            allow_multiple: true,
            order_index: 2,
          },
          //TEST
        )
        .select();
      if (error) {
        console.error('Supabase error at insertQuestion:', error);
      }
    } catch (err) {
      console.error('Unexpected JS runtime error insertQuestion:', err);
    }
  }

  listenForQuestionInserts() {
    this.questionChannel = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'questions' },
        (payload) => {
          const newQuestion = payload.new as Question;
          this.questions.update((current) => [...current, newQuestion]);
        },
      )
      .subscribe();
  }

  stopListeningForQuestionInserts(){
    if(this.questionChannel){
      this.questionChannel.unsubscribe();
      this.questionChannel = null;
    }
  }
}

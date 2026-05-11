import { Injectable, signal } from '@angular/core';
import { Question } from '../interfaces/question.interface';
import { supabase } from './supabase.client';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  questions = signal<Question[]>([]);

  async getQuestionsForSurvey(surveyId: string) {
    try {
      let { data: questions, error } = await supabase
        .from('questions')
        .select('*')
        .eq('survey_id', surveyId);
        if(error) console.error("getQuestionsForSurvey error:", error);
      this.questions.set(questions ?? ([] as Question[]));
    } catch (err) {
      console.error('Unexpected error in getQuestionsForSurvey', err);
    }
  }
}

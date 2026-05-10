import { Injectable, signal } from '@angular/core';
import { Question } from '../interfaces/question.interface';
import { supabase } from './supabase.client';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  questions = signal<Question[]>([]);

  async getQuestionsForSurvey(surveyId: string) {
    let { data: questions, error } = await supabase
      .from('questions')
      .select('*')
      .eq('survey_id', surveyId);
    this.questions.set(questions ?? ([] as Question[]));
  }
}

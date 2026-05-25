import { Injectable, signal } from '@angular/core';
import { Option } from '../interfaces/option.interface';
import { supabase } from './supabase.client';

@Injectable({
  providedIn: 'root',
})
export class OptionService {
  options = signal<Option[]>([]);

  async getOptionsForQuestion(questionId: string): Promise<Option[]> {
    try {
      const { data, error } = await supabase
        .from('options')
        .select('*')
        .eq('question_id', questionId)
        .order('order_index', { ascending: true });

      if (error) {
        console.error('getOptionsForQuestion error:', error);
        return [];
      }

      return data ?? [];
    } catch (err) {
      console.error('Unexpected error in getOptionsForQuestion:', err);
      return [];
    }
  }

  // ADDED now for the survey-page
  async getOptionsForSurvey(surveyId: string): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('options')
        .select('*, questions!inner(survey_id)')
        .eq('questions.survey_id', surveyId)
        .order('order_index', { ascending: true });

      if (error) {
        console.error('getOptionsForSurvey error:', error);
        this.options.set([]);
        return;
      }

      this.options.set((data as Option[]) ?? []);
    } catch (err) {
      console.error('Unexpected error in getOptionsForSurvey:', err);
      this.options.set([]);
    }
  }
  //end

  async insertOptions() {
    try {
      const { data, error } = await supabase
        .from('options')
        .insert(
          //TEST
          {
            question_id: 1,
            text: 'Tis is a test answer from VS-Code',
            order_index: 'C',
          },
          //TEST
        )
        .select();
      if (error) {
        console.error('Supabase error at insertOptions:', error);
      }
    } catch (err) {
      console.error('Unexpected JS runtime error at insertOptions', err);
    }
  }
}

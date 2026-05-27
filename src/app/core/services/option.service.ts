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

  // for the survey detail-page
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

  async insertOptions(option: any, questionId: number) {
    try {
      const { data, error } = await supabase
        .from('options')
        .insert(
          {
            question_id: questionId,
            text: option.text,
            order_index: option.order_index,
          },
        )
        .select();
      if (error) {
        console.error('Supabase error at insertOptions:', error);
      }
      return data?.[0];
    } catch (err) {
      console.error('Unexpected JS runtime error at insertOptions', err);
    }
  }
}

import { Injectable, signal } from '@angular/core';
import { Option } from '../interfaces/option.interface';
import { supabase } from './supabase.client';

@Injectable({
  providedIn: 'root',
})
export class OptionService {
  options = signal<Option[]>([]);

  async getOptionsForQuestion(questionId: string): Promise<void> {
    try {
      const { data: options, error } = await supabase
        .from('options')
        .select('*')
        .eq('question_id', questionId);

      if (error) {
        console.error('getOptionsForQuestion error:', error);
        this.options.set([]);
        return;
      }
      this.options.set(options ?? []);
    } catch (err) {
      console.error('Unexpected error in getOptionsForQuestion:', err);
      this.options.set([]);
    }
  }

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

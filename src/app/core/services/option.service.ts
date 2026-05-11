import { Injectable, signal } from '@angular/core';
import { Option } from '../interfaces/option.interface';
import { supabase } from './supabase.client';

@Injectable({
  providedIn: 'root',
})
export class OptionService {
  options = signal<Option[]>([]);

  async getOptionsForQuestion(questionId: string) {
    try {
      let { data: options, error } = await supabase
        .from('options')
        .select('*')
        .eq('question_id', questionId);

      if (error) console.error('getOptionsForQuestion error:', error);

      this.options.set(options ?? ([] as Option[]));
    } catch (err) {
      console.error('Unexpected error in getOptionsForQuestion:', err);
    }
  }
}

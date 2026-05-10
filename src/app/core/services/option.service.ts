import { Injectable, signal } from '@angular/core';
import { Option } from '../interfaces/option.interface';
import { supabase } from './supabase.client';

@Injectable({
  providedIn: 'root',
})
export class OptionService {
  options = signal<Option[]>([]);

  async getOptionsForQuestion(questionId: string) {
    let { data: options, error } = await supabase
      .from('options')
      .select('*')
      .eq('question_id', questionId);

      this.options.set(options ?? ([] as Option[]));
  }
}

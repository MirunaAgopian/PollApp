import { Injectable, signal } from '@angular/core';
import { Option } from '../interfaces/option.interface';
import { supabase } from './supabase.client';
import { RealtimeChannel } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class OptionService {
  options = signal<Option[]>([]);
  optionChannel: RealtimeChannel | null = null;

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

  listenForOptionsInsert() {
    this.optionChannel = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'options' },
        (payload) => {
          const newOption = payload.new as Option;
          this.options.update((current) => [...current, newOption]);
        },
      )
      .subscribe();
  }

  stopListeningForOptionsInsert() {
    if (this.optionChannel) {
      this.optionChannel.unsubscribe();
      this.optionChannel = null;
    }
  }
}

import { Injectable, signal } from '@angular/core';
import { Survey } from '../interfaces/survey.interface';
import { supabase } from './supabase.client';
import { RealtimeChannel } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  surveys = signal<Survey[]>([]);
  singleSurvey = signal<Survey | null>(null);
  surveyChannel: RealtimeChannel | null = null;

  constructor() {
    this.getAllSurveys();
  }

  async getAllSurveys() {
    try {
      let { data: surveys, error } = await supabase.from('surveys').select('*');
      if (error) console.error('getAllSurveys error:', error);
      this.surveys.set(surveys ?? ([] as Survey[]));
    } catch (err) {
      console.error('Unexpected error in getAllSurveys', err);
    }
  }

  async getSingleSurvey(id: string) {
    try {
      let { data: surveys, error } = await supabase
        .from('surveys')
        .select('*')
        .eq('id', id)
        .single();
      if (error) console.error('getSingleSurvey error:', error);
      this.singleSurvey.set(surveys);
    } catch (err) {
      console.error('Unexpected error in getSingleSurvey:', err);
    }
  }

  async insertSurvey() {
    try {
      const { data, error } = await supabase
        .from('surveys')
        .insert({
          //later I should change these values with the values from formControl!
          title: 'Test2',
          description: 'this has been inserted via VS-Code',
          category: 'Test data',
          end_date: '2026-06-01',
          is_published: true,
          //this block should be changed!
        })
        .select();
      if (error) {
        console.error('Supabase error:', error);
        return;
      }
    } catch (err) {
      console.error('Unexpected runtime error:', err);
    }
  }

  listenForSurveyInserts() {
    this.surveyChannel = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'surveys' },
        (payload) => {
          const newSurvey = payload.new as Survey;
          this.surveys.update((current) => [...current, newSurvey]);
        },
      )
      .subscribe();
  }

  stopListeningForSurveyInserts() {
    if(this.surveyChannel){
      this.surveyChannel.unsubscribe();
      this.surveyChannel = null;
    }
  }
}

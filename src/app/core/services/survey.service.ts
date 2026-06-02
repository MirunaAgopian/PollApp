import { Injectable, signal } from '@angular/core';
import { Survey } from '../interfaces/survey.interface';
import { supabase } from './supabase.client';
import { RealtimeChannel } from '@supabase/supabase-js';
import { ReturnStatement } from '@angular/compiler';

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
      if (error) console.error('Supabase error at getAllSurveys:', error);
      this.surveys.set(surveys ?? ([] as Survey[]));
    } catch (err) {
      console.error('Unexpected JS runtime error at getAllSurveys', err);
    }
  }

  async getSingleSurvey(id: string) {
    try {
      let { data: surveys, error } = await supabase
        .from('surveys')
        .select('*')
        .eq('id', id)
        .single();
      if (error) console.error('Supabase error at getSingleSurvey:', error);
      this.singleSurvey.set(surveys);
      return surveys;
    } catch (err) {
      console.error('Unexpected JS runtime error in getSingleSurvey:', err);
      return null;
    }
  }

  async insertSurvey(survey: any) {
    try {
      const { data, error } = await supabase
        .from('surveys')
        .insert({
          title: survey.title,
          description: survey.description,
          category: survey.category,
          end_date: survey.end_date,
          is_published: survey.is_published,
        })
        .select();
      if (error) {
        console.error('Supabase error at insertSurvey:', error);
        return;
      }
      return data?.[0];
    } catch (err) {
      console.error('Unexpected JS runtime error at insertSurvey:', err);
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
    if (this.surveyChannel) {
      this.surveyChannel.unsubscribe();
      this.surveyChannel = null;
    }
  }
}

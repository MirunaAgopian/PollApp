import { Injectable, signal } from '@angular/core';
import { Survey } from '../interfaces/survey.interface';
import { supabase } from './supabase.client';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  surveys = signal<Survey[]>([]);
  singleSurvey = signal<Survey | null>(null);

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
}

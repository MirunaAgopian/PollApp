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
    let { data: surveys, error } = await supabase.from('surveys').select('*');
    this.surveys.set(surveys ?? ([] as Survey[]));
  }

  async getSingleSurvey(id: string) {
    let { data: surveys, error } = await supabase.from('surveys').select('*').eq('id', id).single();
    this.singleSurvey.set(surveys);
  }

}

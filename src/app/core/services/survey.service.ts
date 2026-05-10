import { Injectable, signal } from '@angular/core';
import { Survey } from '../interfaces/survey.interface';
import { supabase } from './supabase.client';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  surveys = signal<Survey[]>([]);
  singleSurvey = signal<Survey | null>(null);
}

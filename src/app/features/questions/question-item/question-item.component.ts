import { Component, Input, QueryList, ViewChildren, inject, signal } from '@angular/core';
import { Question } from '../../../core/interfaces/question.interface';
import { OptionService } from '../../../core/services/option.service';
import { OptionItem } from '../../options/option-item/option-item.component';
import { Option } from '../../../core/interfaces/option.interface';
import { supabase } from '../../../core/services/supabase.client';
import { RealtimeChannel } from '@supabase/supabase-js';
import { VoteResults } from '../../votes/vote-results/vote-results.component';

@Component({
  selector: 'app-question-item',
  imports: [OptionItem, VoteResults],
  templateUrl: './question-item.component.html',
  styleUrl: './question-item.component.scss',
})

export class QuestionItem {
  @Input() question!: Question;
  optionService = inject(OptionService);
  options = signal<Option[]>([]);
  private optionChannel: RealtimeChannel | null = null;
  @ViewChildren(OptionItem) optionItems!: QueryList<OptionItem>;
  totalVotes = signal(0);
  

  async ngOnInit() {
    const initialOptions = await this.optionService.getOptionsForQuestion(this.question.id);
    this.options.set(initialOptions);
    this.listenForOptionInserts();
  }

  ngAfterViewInit(){
    this.totalVotes.set(this.calculateAllVotes());
  }

  listenForOptionInserts() {
    this.optionChannel = supabase
      .channel(`options-insert-${this.question.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'options',
          filter: `question_id=eq.${this.question.id}`,
        },
        (payload) => {
          const newOption = payload.new as Option;
          this.options.update((current) => [...current, newOption]);
        },
      )
      .subscribe();
  }

  stopListeningForOptionInsert() {
    if (this.optionChannel) {
      this.optionChannel.unsubscribe();
      this.optionChannel = null;
    }
  }

  isMultipleAllowed(): boolean {
    return this.question.allow_multiple === true;
  }

  calculateAllVotes(){
    let totalVotes = 0;
    this.optionItems.forEach(item => {
      totalVotes= totalVotes + item.getVoteCount();
    });
    return totalVotes;
  }
   
}

import { Component, Input, inject } from '@angular/core';
import { Question } from '../../../core/interfaces/question.interface';
import { OptionService } from '../../../core/services/option.service';
import { OptionItem } from '../../options/option-item/option-item.component';

@Component({
  selector: 'app-question-item',
  imports: [OptionItem],
  templateUrl: './question-item.component.html',
  styleUrl: './question-item.component.scss',
})
export class QuestionItem {
  @Input() question! : Question;

  optionService = inject(OptionService);
  questionOptions = this.optionService.options;

  ngOnInit(){
    this.optionService.getOptionsForQuestion(this.question.id);
  }

  isMultipleAllowed():boolean {
    return this.question.allow_multiple === true;
  }
}

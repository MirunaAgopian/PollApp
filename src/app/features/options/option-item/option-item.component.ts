import { Component, inject, Input, Output, signal, EventEmitter } from '@angular/core';
import { Option } from '../../../core/interfaces/option.interface';


@Component({
  selector: 'app-option-item',
  imports: [],
  templateUrl: './option-item.component.html',
  styleUrl: './option-item.component.scss',
})
export class OptionItem {
  @Input() option!: Option;
  @Output() vote = new EventEmitter<Option>();

  onVoteClick() {
    this.vote.emit(this.option);
  }
}

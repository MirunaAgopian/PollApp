import { Component, input, output } from '@angular/core';
import { DeleteBtn } from '../../../shared/components/delete-btn/delete-btn';

@Component({
  selector: 'app-create-question',
  imports: [DeleteBtn],
  templateUrl: './create-question.component.html',
  styleUrl: './create-question.component.scss',
})
export class CreateQuestion {
  isVisible: boolean = false;


  showErrorMsg(event: Event) {
    let eventVar = event.target as HTMLInputElement;
    if (eventVar.value === '') {
      this.isVisible = true;
    } else {
      this.isVisible = false;
    }
  }
}

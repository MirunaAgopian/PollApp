import { Component } from '@angular/core';
import { DeleteBtn } from '../../../shared/components/delete-btn/delete-btn';

@Component({
  selector: 'app-create-option',
  imports: [DeleteBtn],
  templateUrl: './create-option.component.html',
  styleUrl: './create-option.component.scss',
})
export class CreateOption {
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

import { Component, output } from '@angular/core';

@Component({
  selector: 'app-delete-btn',
  imports: [],
  templateUrl: './delete-btn.html',
  styleUrl: './delete-btn.scss',
})
export class DeleteBtn {
  delete = output<void>();
}

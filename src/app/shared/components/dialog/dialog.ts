import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  templateUrl: './dialog.html',
  styleUrls: ['./dialog.scss'],
})
export class Dialog {
  open = input<boolean>(false);
  openChange = output<boolean>();

  close() {
    this.openChange.emit(false);
  }
  
}

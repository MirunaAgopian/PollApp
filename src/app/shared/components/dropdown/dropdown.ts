import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
})
export class Dropdown {
  @Input() label: string = '';
  @Input() options: string[] = [];
  @Input() value: string | null = null;
  @Output() valueChange = new EventEmitter<string>();
  @ViewChild('dropdownRef') dropdownRef!: ElementRef;

  isCategoriesOpen = false;

  toggleDropdown() {
    this.isCategoriesOpen = !this.isCategoriesOpen;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    const target = event.target as HTMLElement;
    const clickedInside = this.dropdownRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.isCategoriesOpen = false;
    }
  }

  select(option: string) {
    this.value = option;
    this.valueChange.emit(option);
    this.isCategoriesOpen = false;
  }
}

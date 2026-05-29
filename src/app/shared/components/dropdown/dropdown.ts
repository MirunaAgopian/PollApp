import { Component, ElementRef, HostListener, input, output, viewChild } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
})
export class Dropdown {
  label = input<string>('');
  options = input<string[]>([]);
  value = input<string | null>(null);
  valueChange = output<string>();
  dropdownRef = viewChild<ElementRef>('dropdownRef');

  isCategoriesOpen = false;

  toggleDropdown() {
    this.isCategoriesOpen = !this.isCategoriesOpen;
  }

  onTriggerClick(event: MouseEvent) {
    event.stopPropagation();
    this.toggleDropdown();
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    const target = event.target as HTMLElement;
    const clickedInside = this.dropdownRef()?.nativeElement.contains(target);
    if (!clickedInside) {
      this.isCategoriesOpen = false;
    }
  }


  select(option: string) {
    this.valueChange.emit(option);
    this.isCategoriesOpen = false;
  }
}

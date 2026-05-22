import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
})
export class Dropdown {
  @Input() label: string = "Sort by categories"
  @Input() options: string[] = [];
  @Input() value: string | null = null;
  @Output() valueChange = new EventEmitter<string>();

  isCategoriesOpen = false;

  toggleDropdown(){
    this.isCategoriesOpen = !this.isCategoriesOpen;
  }

  select(option:string){
    this.value = option;
    this.valueChange.emit(option);
    this.isCategoriesOpen = false;
  }
}

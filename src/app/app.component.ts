import {Component, ElementRef, OnInit,  ViewChild, NgModule,} from '@angular/core';
import { UUID } from 'uuid-generator-ts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'memo-app';

  newValue: string = '';
  // memoList: Array<string> = [];

  itemInterface: {
    id: object;
    value: string;
  }[] = [];

  @ViewChild('newInput') newInput!: ElementRef;

  ngOnInit(): void {
  
    const itemInterface = localStorage.getItem('memoList');
    if (itemInterface) {
      this.itemInterface = JSON.parse(itemInterface);
    }
  }

  changeNewValue(event: string) {
    console.log(event);
    this.newValue = event;
  }

  saveNewValue() {

    if (this.newValue.length < 1) {
      alert('Enter a value');
      return;
    };


    const newItem = {
      id: new UUID(), 
      value: this.newValue,
    };

    this.newValue = '';

    this.itemInterface.push(newItem);

    if (this.newInput) {
      this.newInput.nativeElement.value = '';
    }

    localStorage.setItem('memoList', JSON.stringify(this.itemInterface));

    console.log(this.itemInterface);
  }

  removeItem(id: object) {

    // Filter the itemInterface array to exclude the item with the specified ID
    const updatedItemInterface = this.itemInterface.filter(
      (item) => item.id !== id
    );
    console.log(updatedItemInterface);

    // Update the itemInterface array with the filtered array
    this.itemInterface = updatedItemInterface;
    console.log(this.itemInterface);
  }

  deleteAll() {
    this.itemInterface = [];
    console.log(this.itemInterface);
  }
}

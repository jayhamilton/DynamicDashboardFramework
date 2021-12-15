import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';

export interface ProductItem {
  name: string;
  position: number;
  description: string;
  date: string;
}

const ELEMENT_DATA: ProductItem[] = [
  {position: 1, name: 'Armoni', date: '12/10/2021', description: 'Armoni box set'},
];
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent {

  displayedColumns: string[] = ['position', 'name', 'date', 'description'];
  dataToDisplay = [...ELEMENT_DATA];

  dataSource = new ExampleDataSource(this.dataToDisplay);

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataToDisplay = [...this.dataToDisplay, ELEMENT_DATA[randomElementIndex]];
    this.dataSource.setData(this.dataToDisplay);
  }

  removeData() {
    this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    this.dataSource.setData(this.dataToDisplay);
  }
}

class ExampleDataSource extends DataSource<ProductItem> {
  private _dataStream = new ReplaySubject<ProductItem[]>();

  constructor(initialData: ProductItem[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<ProductItem[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: ProductItem[]) {
    this._dataStream.next(data);
  }
}


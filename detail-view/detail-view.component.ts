import {Component, Input, Output, EventEmitter, OnInit, PipeTransform} from '@angular/core';
import {Column, Settings} from '../types/interfaces';
import {ColumnUtils} from '../utils/column-utils';

@Component({
  selector: 'detail-view',
  templateUrl: 'detail-view.component.html'
})

export class DetailViewComponent implements OnInit {

  @Input() public columns: Column[];
  @Input() public settings: Settings;
  @Input() public item: any;

  @Output() onSaveItem: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteItem: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  public edit: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  format(value: any, column: Column) {
    const userPipe: PipeTransform = column.pipe;
    if (userPipe) {
      return userPipe.transform(value);
    }
    if (value) {
      value = ColumnUtils.getOptionName(value, column);
    }
    return value;
  }

  closeForm() {
    this.edit = false;
  }

  toggleForm() {
    this.edit = !this.edit;
  }

  closeDetails() {
    this.onClose.emit(true);
  }

  saveItem() {
    this.onSaveItem.emit(this.item);
    this.edit = false;
  }

  deleteItem() {
    this.onDeleteItem.emit(this.item);
    this.onClose.emit(true);
  }

}

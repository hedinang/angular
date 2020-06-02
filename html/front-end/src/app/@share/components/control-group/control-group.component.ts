import { Component, OnInit, Injector, Output, EventEmitter, Input } from '@angular/core';
import { AbstractBaseComponent } from '../../../@core/base/base.component';

@Component({
  selector: 'app-control-group',
  templateUrl: './control-group.component.html',
  styleUrls: ['./control-group.component.scss'],
})
export class ControlGroupComponent extends AbstractBaseComponent implements OnInit {
  @Input() showAdd: boolean;
  @Input() showEdit: boolean;
  @Input() showDelete: boolean;
  @Input() showExportExcel: boolean;
  @Input() showOption: boolean;

  @Input() optionText: string;

  @Input() isDisableAdd: boolean;
  @Input() isDisableEdit: boolean;
  @Input() isDisableOption: boolean;
  @Input() isDisableDelete: boolean;
  @Input() isDisableExportExcel: boolean;

  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() option: EventEmitter<any> = new EventEmitter();

  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() exportExcel: EventEmitter<any> = new EventEmitter();
  constructor(injector: Injector) {
    super(injector);
    this.initDefault();
  }

  initDefault() {
    // Init show
    if (this.showAdd === undefined || this.showAdd === null) {
      this.showAdd = true;
    }
    if (this.showEdit === undefined || this.showEdit === null) {
      this.showEdit = true;
    }
    if (this.showOption === undefined || this.showOption === null) {
      this.showOption = false;
    }
    if (this.showDelete === undefined || this.showDelete === null) {
      this.showDelete = true;
    }
    if (this.showExportExcel === undefined || this.showExportExcel === null) {
      this.showExportExcel = true;
    }
    // Init text option
    if (this.optionText === undefined || this.optionText === null) {
      this.optionText = this.getValueFromKeyTranslate('body.share.control-group.option');
    }
    // Init disable
    if (this.isDisableAdd === undefined || this.isDisableAdd === null) {
      this.isDisableAdd = true;
    }
    if (this.isDisableEdit === undefined || this.isDisableEdit === null) {
      this.isDisableEdit = true;
    }
    if (this.isDisableOption === undefined || this.isDisableOption === null) {
      this.isDisableOption = true;
    }
    if (this.isDisableDelete === undefined || this.isDisableDelete === null) {
      this.isDisableDelete = true;
    }
    if (this.isDisableExportExcel === undefined || this.isDisableExportExcel === null) {
      this.isDisableExportExcel = true;
    }
  }
  onAdd(event: any) {
    this.add.emit(event);
  }

  onEdit(event: any) {
    this.edit.emit(event);
  }

  onOption(event: any) {
    this.option.emit(event);
  }

  onDelete(event: any) {
    this.delete.emit(event);
  }

  onExportExcel(event: any) {
    this.exportExcel.emit(event);
  }

  ngOnInit(): void {}
}

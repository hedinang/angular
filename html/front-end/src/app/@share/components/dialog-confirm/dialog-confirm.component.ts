import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss'],
})
export class DialogConfirmComponent implements OnInit {
  title: string;
  message: string;

  constructor(
    public bsModalRef: BsModalRef,
    private bsModalService: BsModalService
  ) {}

  onClose(reason) {
    this.bsModalService.setDismissReason(reason);
    this.bsModalRef.hide();
  }

  ngOnInit(): void {}
}

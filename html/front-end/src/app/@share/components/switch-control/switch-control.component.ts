import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-switch-control',
  templateUrl: './switch-control.component.html',
  styleUrls: ['./switch-control.component.scss'],
})
export class SwitchControlComponent implements OnInit {
  @Input() idSwitch: string;
  @Input() status: boolean;
  @Input() formControlName: string;
  constructor() {
    if (this.status === undefined || this.status === null) {
      this.status = false;
    }
  }

  ngOnInit(): void {}
}

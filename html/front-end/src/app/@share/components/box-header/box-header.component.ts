import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-box-header',
  templateUrl: './box-header.component.html',
  styleUrls: ['./box-header.component.scss'],
})
export class BoxHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() hasMarginBottom: boolean;
  constructor() {
    if (this.hasMarginBottom === undefined || this.hasMarginBottom === null) {
      this.hasMarginBottom = true;
    }
  }
  ngOnInit(): void {}
}

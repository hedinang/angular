import { Component, OnInit, Injectable, Injector } from '@angular/core';
import { AbstractBaseComponent } from '../../../@core/base/base.component';
import { LoadingData } from '../../../@core/models/load-data.model';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent extends AbstractBaseComponent implements OnInit {
  show: boolean;
  data: LoadingData;
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.rxSubscribe(this.loadingService.loadingObserable, (data: LoadingData) => {
      if (data) {
        this.show = !!data.show;
        this.data = data;
      } else {
        this.show = false;
        this.data = null;
      }
    });
  }
}

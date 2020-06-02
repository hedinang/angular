import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

const SERVICES = [];
@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [...SERVICES],
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [...SERVICES],
    };
  }
}

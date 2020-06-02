import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ShareModule } from '../@share/share.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MainLayoutComponent } from './layouts/main/main.layout';
import { MenuComponent } from './components/menu/menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
const BASE_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  ShareModule,
  TranslateModule,
];
const THEME_MODULES = [BsDropdownModule.forRoot(), CollapseModule.forRoot()];
const COMPONENTS = [HeaderComponent, FooterComponent, LoadingComponent, MainLayoutComponent, MenuComponent];
const PIPES = [];
@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [...BASE_MODULES, ...THEME_MODULES],
  exports: [...BASE_MODULES, ...THEME_MODULES, ...COMPONENTS, ...PIPES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ThemeModule,
      providers: [],
    };
  }
}

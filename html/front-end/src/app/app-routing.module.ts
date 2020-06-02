import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './@core/guards/authentication.guard';
import { MainLayoutComponent } from './@theme/layouts/main/main.layout';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule) },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule) },
      {
        path: 'management/account',
        loadChildren: () => import('./modules/management/account/account.module').then((m) => m.AccountModule),
      },
      {
        path: 'management/group-account',
        loadChildren: () => import('./modules/management/group-account/group-account.module').then((m) => m.GroupAccountModule),
      },
      {
        path: 'management/permissions',
        loadChildren: () => import('./modules/management/permissions/permissions.module').then((m) => m.PermissionsModule),
      },
      {
        path: 'management/campaign',
        loadChildren: () => import('./modules/management/campaign/campaign.module').then((m) => m.CampaignModule),
      },
      {
        path: 'management/partner',
        loadChildren: () => import('./modules/management/partner/partner.module').then((m) => m.PartnerModule),
      },
      {
        path: 'campaign/:code',
        loadChildren: () => import('./modules/campaign-report/campaign-report.module').then((m) => m.CampaignReportModule),
      },
      {
        path: 'user-info',
        loadChildren: () => import('./modules/user-information/user-information.module').then(m => m.UserInformationModule)
      }
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

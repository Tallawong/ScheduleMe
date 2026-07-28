import { Routes } from '@angular/router';
import { HomeComponent } from './core/controls/home';
import { AuthGuard } from './core/helpers';

// const adminModule = () => import('./admin/admin.module').then((x) => x.AdminModule);
// const profileModule = () => import('./profile/profile.module').then((x) => x.ProfileModule);
// const scheduleModule = () =>
//   import('./schedule/schedule-routing.module').then((x) => x.ScheduleRoutingModule);

export const routes: Routes = [
  { path: '', redirectTo: 'account/login', pathMatch: 'full' },
  {
    path: 'account',
    loadChildren: () => import('./account.controls/account.routes').then((m) => m.ACCOUNT_ROUTES),
  },
  /*{ path: '', component: HomeComponent, canActivate: [AuthGuard]},
  
  { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
  {
    path: 'admin',
    loadChildren: adminModule,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  { path: 'schedule', loadChildren: scheduleModule },
  { path: 'floating', component: FloatingSchedulesComponent },
*/
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

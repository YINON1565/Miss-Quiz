import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { TestDetailsComponent } from './pages/test-details/test-details.component';
import {UserPageComponent} from './pages/user-page/user-page.component'
import {UserDetailsComponent} from './pages/user-details/user-details.component'
import { LoginComponent } from './pages/login/login.component';

import { LoggedinUserGuard } from './guards/loggedin-user.guard';

const routes: Routes = [
  {
    path: 'test',
    component: TestPageComponent,
    canActivate: [LoggedinUserGuard],
  },
  {
    path: 'test/:id',
    component: TestDetailsComponent,
    canActivate: [LoggedinUserGuard],
  },
  {
    path: 'user',
    component: UserPageComponent,
    canActivate: [LoggedinUserGuard],
  },
  {
    path: 'user/:id',
    component: UserDetailsComponent,
    canActivate: [LoggedinUserGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/test', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AdminDashBoardComponent } from './ADMIN/Admin-Dash-Board/admin-dashboard.component';
import { UserDashboardComponent } from './Customer/user-dashboard/user-dashboard.component';
import { loginPageComponent } from './Customer/User_Login Page/login.page.component';
import { signupPageComponent } from './Customer/_singup-page/signup.page.component';
import { homeComponent } from './Home/home.component';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { adminLoginPageComponent } from './ADMIN/admin_Login Page/admin.login.page.component';
import { AppComponent } from './app.component';
import { LandinPageComponent } from './landin-page.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandinPageComponent,
    // ...canActivate(redirectToLogin),
  },
  {
    path: 'login',
    component: loginPageComponent,
    ...canActivate(redirectHome),
  },
  { path: 'signup', component: signupPageComponent },
  {
    path: 'user-dashboard/:uid',
    component: UserDashboardComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'admin-login',
    component: adminLoginPageComponent,
  },
  {
    path: 'admin-dashboard/:aid',
    component: AdminDashBoardComponent,
    ...canActivate(redirectToLogin),
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

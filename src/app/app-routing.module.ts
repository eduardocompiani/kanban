import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

//see https://github.com/angular/angularfire2/issues/2099#issuecomment-503403712
const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = redirectLoggedInTo(['/']);

const routes: Routes = [
  {path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToHome)},
  {path: 'register', component: RegisterComponent, ...canActivate(redirectLoggedInToHome)},
  {path: '', component: HomeComponent, ...canActivate(redirectUnauthorizedToLogin)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { WalletComponent } from './pages/wallet/wallet.component';

const routes: Routes = [
 	{ path: 'home', component: HomeComponent },
 // { path: 'login', component: LoginComponent },
 // { path: 'register', component: RegisterComponent },
 // { path: 'profile', component: ProfileComponent },
	{ path: 'user', component: UserComponent },
 // { path: 'mod', component: BoardModeratorComponent },
	{ path: 'wallet', component: WalletComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

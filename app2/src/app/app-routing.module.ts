import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { AccountComponent } from './pages/user/account/account.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { DepositComponent } from './pages/wallet/deposit/deposit.component';
import { TicketDetailPageComponent } from './pages/ticket-detail-page/ticket-detail-page.component';

const routes: Routes = [
 	{ path: 'home', component: HomeComponent },
 // { path: 'login', component: LoginComponent },
  { path: 'signup/:refType/:ref', component: RegisterComponent },
 // { path: 'profile', component: ProfileComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/account', component: AccountComponent },
 // { path: 'mod', component: BoardModeratorComponent },
	{ path: 'wallet', component: WalletComponent },
  { path: 'wallet/deposit', component: DepositComponent },
  { path: 'ticket-details/:ref', component: TicketDetailPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FeaturedBannerComponent } from './components/featured-banner/featured-banner.component';
import { FeaturedGameComponent } from './components/featured-game/featured-game.component';
import { TableGameComponent } from './components/table-game/table-game.component';
import { TabComponent } from './components/tab/tab.component';
import { TableFeaturedGameComponent } from './components/table-featured-game/table-featured-game.component';
import { SwipeDirective } from './swipe.directive';
import { WebsocketService } from "./services/websocket.service";
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptorService, AuthInterceptorProviders } from "./services/auth/auth-interceptor.service";
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { LoginPipe } from './pages/auth/login.pipe';
import { LoginComponent } from './components/auth/login/login.component';
import { BetGamesListComponent } from './components/bet/bet-games-list/bet-games-list.component';
import { LoaderComponent } from './components/loader/loader.component';
import { GameComponent } from './components/game/game.component';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { WalletComponent } from './pages/wallet/wallet.component';
import { DepositComponent } from './pages/wallet/deposit/deposit.component';
import { TransferComponent } from './pages/wallet/transfer/transfer.component';
import { WithdrawComponent } from './pages/wallet/withdraw/withdraw.component';
import { HeaderCommonComponent } from './components/header-common/header-common.component';
import { BalanceCardComponent } from './components/balance-card/balance-card.component';
import { ListComponent } from './components/wallet/transactions/list/list.component';
import { TransactionDetailsPipe } from './pipes/transaction-details.pipe';
import { PaymentComponent } from './pages/payment/payment.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FeaturedBannerComponent,
    FeaturedGameComponent,
    TableGameComponent,
    TabComponent,
    TableFeaturedGameComponent,
    SwipeDirective,
    HomeComponent,
    UserComponent,
    LoginPipe,
    LoginComponent,
    BetGamesListComponent,
    LoaderComponent,
    GameComponent,
    WalletComponent,
    DepositComponent,
    TransferComponent,
    WithdrawComponent,
    HeaderCommonComponent,
    BalanceCardComponent,
    ListComponent,
    TransactionDetailsPipe,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule,
	ReactiveFormsModule
  ],
  providers: [
	AuthInterceptorService,
  	AuthInterceptorProviders,
	WebsocketService,
	CookieService,
	{ provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

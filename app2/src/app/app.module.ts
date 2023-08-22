import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FeaturedBannerComponent } from './components/featured-banner/featured-banner.component';
import { FeaturedGameComponent } from './components/featured-game/featured-game.component';
import { TableGameComponent } from './components/table-game/table-game.component';
import { TabComponent } from './components/tab/tab.component';
import { TableFeaturedGameComponent } from './components/table-featured-game/table-featured-game.component';
import { SwipeDirective } from './swipe.directive';
import { WebsocketService } from './services/websocket.service';
import { ScoreService } from './services/awards/score.service';
import { CepService } from './services/common/cep.service';
import { CookieService } from 'ngx-cookie-service';
import {
  AuthInterceptorService,
  AuthInterceptorProviders,
} from './services/auth/auth-interceptor.service';
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
import { TransactionDepositComponent } from './components/wallet/transactions/deposit/deposit.component';
import { TransactionDetailsPipe } from './pipes/transaction-details.pipe';
import { PaymentComponent } from './pages/payment/payment.component';
import { LuckyballComponent } from './pages/games/luckyball/luckyball.component';
import { LuckyballFeaturedComponent } from './components/games/luckyball/featured/featured.component';
import { FeaturedGamesComponent } from './components/games/featured-games/featured-games.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { BolaoComponent } from './components/games/cards/bolao/bolao.component';
import { StorybookComponent } from './components/common/storybook/storybook.component';
import { PromoBannerComponent } from './components/banners/promo-banner/promo-banner.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AccountComponent } from './pages/user/account/account.component';
import { PreferencesComponent } from './pages/user/preferences/preferences.component';
import { AwardsComponent } from './pages/user/awards/awards.component';
import { WinningsComponent } from './pages/user/winnings/winnings.component';
import { PurchaseTicketsPageComponent } from './pages/purchase-tickets-page/purchase-tickets-page.component';
import { TicketsPageComponent } from './pages/tickets-page/tickets-page.component';
import { TicketDetailPageComponent } from './pages/ticket-detail-page/ticket-detail-page.component';

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
    TransactionDepositComponent,
    TransferComponent,
    WithdrawComponent,
    HeaderCommonComponent,
    BalanceCardComponent,
    ListComponent,
    TransactionDetailsPipe,
    PaymentComponent,
    LuckyballComponent,
    LuckyballFeaturedComponent,
    FeaturedGamesComponent,
    BolaoComponent,
    StorybookComponent,
    PromoBannerComponent,
    RegisterComponent,
    AccountComponent,
    PreferencesComponent,
    AwardsComponent,
    WinningsComponent,
    PurchaseTicketsPageComponent,
    TicketsPageComponent,
    TicketDetailPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    CurrencyMaskModule,
  ],
  providers: [
    AuthInterceptorService,
    AuthInterceptorProviders,
    WebsocketService,
    CepService,
    ScoreService,
    CookieService,
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

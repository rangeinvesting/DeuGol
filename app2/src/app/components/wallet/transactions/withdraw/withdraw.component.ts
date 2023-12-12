import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { EventsService } from './../../../../services/utils/events.service';
import { BaseService } from './../../../../services/api/base.service';
import { TokenStorageService } from './../../../../services/utils/token-storage.service';

const httpOptions: any = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Component({
  selector: 'transactions-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css'],
})
export class TransactionWithdrawComponent implements OnInit {
  amount: any = 0;
  minWithdrawAmount: any;
  maxWithdrawAmount: any;
  method: any;
  paymentSettingsLoaded: boolean = false;

  constructor(
    public afs: AngularFirestore,
    private token: TokenStorageService,
    private api: BaseService,
    private ev: EventsService,
  ) {
    this.ev.trigger('currentTab', 'user');
    this.ev.trigger('showLoader', true);
    this.method = null;
    this.afs
      .collection(`system_rules`)
      .valueChanges()
      .subscribe((data: any) => {
        if (data[0]) {
          this.paymentSettingsLoaded = true;
          this.minWithdrawAmount = 1;
          this.maxWithdrawAmount = 20;
          this.ev.trigger('showLoader', false);
        }
      });
  }

  selectWithdrawMethod(method: any) {
    this.method = method;
  }

  formatMoney(amount: any) {
    return amount.replace(/[^0-9,]*/g, '').replace(',', '.');
  }

  onKeypressEvent(event: any) {
    let amount = this.formatMoney(event.target.value);

    console.log(
      `Valor digitado ${amount}`,
      amount < this.minWithdrawAmount
        ? ` menor do que o minimo ${this.minWithdrawAmount}`
        : '',
      amount > this.maxWithdrawAmount
        ? ` maior do que o máximo ${this.maxWithdrawAmount}`
        : '',
    );
    if (amount < this.minWithdrawAmount) {
      //alert(`Você não Withdrawar menos que ${this.minWithdrawAmount}`)
    }
  }

  Withdraw(WithdrawData: any): Observable<any> {
    return this.api.post('/payment', WithdrawData, httpOptions).pipe(
      map((data: any[]) => {
        return data;
      }),
    );
  }

  initWithdraw() {
    let { user } = this.token.getUser();

    this.ev.trigger('showLoader', true);

    if (this.amount > this.maxWithdrawAmount) {
      this.amount = this.maxWithdrawAmount;
      setTimeout(() => {}, 3000);
      return false;
    }
    this.Withdraw({
      name: user.displayName,
      cpf: user.docs.taxid,
      email: user.email,
      desc: 'Pagamento teste',
      ref: '39048209',
      value: this.amount,
    }).subscribe(
      (result: any) => {
        console.log(result);
        if (result) {
          this.ev.trigger('showLoader', false);
        }
      },
      () => {
        console.log('Error');
        this.ev.trigger('showLoader', false);
      },
    );
    return true;
  }

  ngOnInit(): void {}
}

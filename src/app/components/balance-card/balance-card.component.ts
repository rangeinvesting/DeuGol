import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './../../services/utils/token-storage.service';
import { AccountInterface } from './../../interfaces/account-interface';
import { EventsService } from './../../services/utils/events.service';

@Component({
  selector: 'balance-card',
  templateUrl: './balance-card.component.html',
  styleUrls: ['./balance-card.component.css']
})
export class BalanceCardComponent implements OnInit {
	
  account: any;

  constructor(private token: TokenStorageService, private ev: EventsService) {
	  this.ev.on('updateAccountInfo', (data: any) => {
		  this.account = new AccountInterface(this.token.getUser());
	  });
  }

  ngOnInit(): void {
	  this.ev.trigger('updateAccountInfo', true);
  }

}

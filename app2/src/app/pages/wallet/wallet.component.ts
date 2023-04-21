import { Component, OnInit } from '@angular/core';
import { EventsService } from './../../services/utils/events.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
	
  customerId:number = 0;
  transaction:any;
  typeOfTransaction:string ="none";
  transactionAmount:number = 0;
  fromAccountId:number = 0;
  toAccountId:number = 0;
  showAlert:boolean=false;
  prevColor:string = "alert-warning";

  constructor(private ev: EventsService) { }

  ngOnInit(): void {
	  this.ev.trigger('currentTab',"user");
  }

}

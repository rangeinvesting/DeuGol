import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../../../services/wallet/transactions.service';
import { EventsService } from '../../../../services/utils/events.service';

@Component({
  selector: 'transactions-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

	transactions: any = [];
	
  constructor(private ev: EventsService, private walletTransactions: TransactionsService) {
	  this.ev.on('updatePaymentStatus', (data: any) => {
			this.getTransactions();
		});
  }

  ngOnInit(): void {	  
	  this.getTransactions();
  }
	
  getTransactions(){
	  const _transactions = this.walletTransactions.transactions();
	  
	  if(_transactions){
		  _transactions.subscribe((data: any)=>{
			 this.transactions = data;
		  })
	  }
  }

  convertTimeStampToDate(date: any){
  	return new Date(date.seconds * 1000); 
  }
	
  transactionsList(data: any){
	  return data.sort((a: any, b: any) => b.createdAt - a.createdAt);
  }

}

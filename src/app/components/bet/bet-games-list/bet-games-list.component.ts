import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../services/utils/events.service';
import { BetService } from '../../../services/bet.service';

@Component({
  selector: 'bet-games-list',
  templateUrl: './bet-games-list.component.html',
  styleUrls: ['./bet-games-list.component.css']
})
export class BetGamesListComponent implements OnInit {

	haveCurrentBetGames: boolean = false;
	quotation: any = 0;
	quotationFactor: any = '';
	
  constructor(private ev: EventsService, public betService: BetService) {
	  this.haveCurrentBetGames = this.checkHavecurrentBetGames();
	  this.quotation = localStorage.getItem('currentBetQuotation');
	  this.quotationFactor = this.getQuotationFactor();
	  
	  this.ev.on("setBet", (result: any) => {
		this.haveCurrentBetGames = this.checkHavecurrentBetGames();
		this.quotation = result.detail.cotacao;
		localStorage.setItem('currentBetQuotation', this.quotation);
		this.quotationFactor = this.getQuotationFactor();
	  });
  }
	
  getQuotationFactor(){
	  try{
	  const factor: any = Object.keys(this.betService.getBetStorage()).length;
	  var factorLabel = 'Escolha mais de 1 jogo';

	  if(factor == 2){
		  factorLabel = 'Dupla';
	  }else if(factor == 3){
		  factorLabel = 'Tripla';
	  }else if(factor >= 4){
		  factorLabel = 'Múltipla';
	  }
	  return factorLabel;
	  }catch(e){
		return 'Escolha mais de 1 jogo';
	  }
  }
	
  checkHavecurrentBetGames(){
	  try{
	  	return Object.keys(this.betService.getBetStorage()).length>0?true:false;
	  }catch(e){
		return false;  
	  }
  }

  ngOnInit(): void {
  }

}

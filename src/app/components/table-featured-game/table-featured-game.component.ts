import { Component, OnInit, Input } from '@angular/core';

import { FeaturedGames } from '../../featured-games';

@Component({
  selector: 'table-featured-game',
  templateUrl: './table-featured-game.component.html',
  styleUrls: ['./table-featured-game.component.css']
})


export class TableFeaturedGameComponent implements OnInit {
	
	@Input() sectionTitle = '';
	
  games: FeaturedGames[] = [];
	
  loading: boolean = false;
	
  curPage: number;
  pageSize: number;

  constructor() {
	  	  
	this.games = [{
		home:'Vasco',
		away:'Juventude',
		odds:{
			home: 1.56,
			draw: 2.53,
			away: 3.15
		}
	},{
		home:'Palmeiras',
		away:'Corinthians',
		odds:{
			home: 1.26,
			draw: 2.55,
			away: 2.90
		}
	},{
		home:'Coritiba',
		away:'CA Paranaense',
		odds:{
			home: 2.50,
			draw: 1.50,
			away: 2.50
		}
	},{
		home:'Maringรก',
		away:'Londrina',
		odds:{
			home: 2.53,
			draw: 1.55,
			away: 2.80
		}
	}];

	this.curPage = 0;
    this.pageSize = 1; // any page size you want 
	  
  }

  ngOnInit(): void {
  }
	
	getOddsButtonColor(odds: any){
		
		var colorBg = '#031751', color = '#fff';
		
		if(odds >= 2){
			colorBg = '#ff5722';
			color = '#ff5722';
		}
		
		if(odds > 2.6){
			colorBg = '#e53935';
			color = '#e53935';
		}
		
		if(odds < 2){
			colorBg = 'green';
			color = 'green';
		}
		
		return {
			'borderColor': colorBg,
			'color': color
		}
	}
	
	numberOfPages() {
    	return Math.ceil(this.games.length / this.pageSize);
    }
	
	setCurPage(page: number){
		
		let totalItems = this.games.length;
		let cursorPage = (page+1);
		
		this.loading = true;
		
		if(cursorPage>totalItems){
			page = 0;
		}
		
		if(cursorPage<1){
			page = (totalItems-1);
		}
		
		console.log('Page', page, cursorPage, totalItems, this.curPage)
		setTimeout(()=>{
			this.loading = false;
			this.curPage = page;
		}, 1000)
	}
	
	getCurrentFeuaturedGame(){
		return [this.games[this.curPage]];
	}

}

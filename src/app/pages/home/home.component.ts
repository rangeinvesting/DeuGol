import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HeaderComponent } from './../../components/header/header.component';
import { FeaturedBannerComponent } from './../../components/featured-banner/featured-banner.component';
import { TableGameComponent } from './../../components/table-game/table-game.component';
import { TableFeaturedGameComponent } from './../../components/table-featured-game/table-featured-game.component';
import { FeaturedGamesComponent } from './../../components/games/featured-games/featured-games.component';
import { BolaoComponent } from './../../components/games/cards/bolao/bolao.component';
import { BaseService } from './../../services/api/base.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenStorageService } from './../../services/utils/token-storage.service';
import { EventsService } from './../../services/utils/events.service';

export interface Post {
  title:string;
  content:string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	title = 'DeuGol';
	settings: any = [];
	isLoggedIn: boolean = false;

	
	constructor(private api: BaseService, cookieService: CookieService, private tokenStorageService: TokenStorageService, private ev: EventsService) {
		/*if(!cookieService.get('_session')){
			this.api.get('config').subscribe(result =>{
				try{
				const { name, value } = result.cookies;
				if(name && value){
					cookieService.set('_session', value);
				}
				}catch(e){
					
				}
			 });
		}*/

		this.isLoggedIn = !!this.tokenStorageService.getToken();
	}

	ngOnInit(): void {
		
		/*const evt:any = new CustomEvent("MyEventType", {detail: "user"});
		window.dispatchEvent(evt);*/
		this.ev.trigger('currentTab',"home");
		this.ev.trigger('updateAccountInfo', true);
		setTimeout(()=>{
			//this.ev.trigger('infos',{ newGames:4 });
		},4000)
  	}
	
	get isMobile() {
		// credit to Timothy Huang for this regex test:
		// https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3
		if (
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			)
		) {
			return true;
		} else {
			return false;
		}
	}
	
	load(){

	}
	
}
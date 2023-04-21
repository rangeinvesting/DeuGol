import { Component } from '@angular/core';
import { BaseService } from './services/api/base.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenStorageService } from './services/utils/token-storage.service';
import { TabComponent } from './components/tab/tab.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthService } from './services/auth/auth.service';
import { AccountInterface } from './interfaces/account-interface';
import { EventsService } from './services/utils/events.service';
import { WebsocketService } from './services/websocket.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'DeuGol';
	settings: any = [];
	isLoggedIn: boolean = false;
	
	constructor(private api: BaseService, private ev: EventsService, cookieService: CookieService, private tokenStorageService: TokenStorageService, private auth: AuthService, private wsClient: WebsocketService) {
		
		wsClient.connect((ws: any)=>{
			wsClient.on('updatePaymentStatus', (data:any)=>{
				this.ev.trigger('updatePaymentStatus', data);
			})
		});
			
				
		if(!cookieService.get('_session')){
			this.api.get('config').subscribe(result =>{
				const { name, value } = result.cookies;
				if(name && value){
					cookieService.set('_session', value);
					localStorage.setItem('cookie', value);
				}
				if(result.viewstate){
					localStorage.setItem('viewstate', result.viewstate);
				}
			 });
		}
		this.isLoggedIn = !this.tokenStorageService.getToken();
		this.getMe();
		this.ev.on('logout', (data: any) => {
			this.auth.logOut();
		});
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
	
	getMe(){
		//this.ev.trigger('showLoader', true);
		this.auth.me().subscribe((result: any) =>{
			//this.ev.trigger('showLoader', false);
			console.log(result)
			if(result.success == false || result.logout == false){
				this.ev.trigger('logout', true);
				return;
			}
			this.tokenStorageService.saveUser(result);
			this.ev.trigger('logon', true);
			this.ev.trigger('updateAccountInfo', true);
		},
        (error: any) => {                              //Error callback
          //this.ev.trigger('logout', true);
        });
	}
	
	load(){
		console.log('Passou!')
	}

}
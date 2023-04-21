import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { EventsService } from './../../services/utils/events.service';
import { TokenStorageService } from './../../services/utils/token-storage.service';
import { AccountInterface } from './../../interfaces/account-interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	isLogged: any;
	account: any;
	
  constructor(private router: Router, private auth: AuthService, private ev: EventsService, private token: TokenStorageService) {
  	this.isLogged = this.auth.isLogged();

	  this.ev.on('logon', (data: any) => {
		  this.isLogged = this.auth.isLogged();
		  this.ev.trigger('updateAccountInfo', true);
	  });
	  
	  this.ev.on('updateAccountInfo', (data: any) => {
		  this.account = new AccountInterface(this.token.getUser());
	  });
  }

  ngOnInit() {
    
  }
	
	public openMenu(event: any) {
    const body = document.getElementsByTagName('body')[0];
	if(event){
    body.classList.add('site-wrapper--has-overlay');
	}else{
	body.classList.remove('site-wrapper--has-overlay');	
	}
  }
	
	openWallet(){
		this.ev.trigger('currentTab', 'user');
		this.router.navigate(['wallet']);
	}
	
	openAuthModal(mode: any){
		this.ev.trigger('showAuthModal', { mode });
	}

}

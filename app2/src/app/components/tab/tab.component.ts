import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../../services/utils/events.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'tab-nav',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
	
	currentTab:any = 'home';
	currentBetGames:any = [];
	newGames:any;
	isLogged: boolean = false;

  constructor(private router: Router, private ev: EventsService, private auth: AuthService) {
	this.ev.on("currentTab", (evt: any) => {
		this.currentTab = evt.detail;
	});
	this.ev.on("infos", (evt: any) => {
		this.newGames = evt.detail.newGames;
	});

	
	this.ev.on('logon', (data: any) => {
		  this.isLogged = !!this.auth.isLogged();
	});
  }

  ngOnInit(): void {
	this.isLogged = !!this.auth.isLogged();
  }
	
  setPage(page: any){
	  this.router.navigate([page]);
	  this.currentTab = page;
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../../services/utils/events.service';

@Component({
  selector: 'header-common',
  templateUrl: './header-common.component.html',
  styleUrls: ['./header-common.component.css']
})
export class HeaderCommonComponent implements OnInit {
	
	@Input() pageTitle = '';

  constructor(private router: Router, private ev: EventsService) { }

  ngOnInit(): void {
  }
	
  close(){
	  this.ev.trigger("currentTab", "home");
	  this.router.navigate(['home']);
  }

}

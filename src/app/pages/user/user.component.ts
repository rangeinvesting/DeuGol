import { Component, OnInit } from '@angular/core';
import { EventsService } from './../../services/utils/events.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private ev: EventsService) { }

  ngOnInit(): void {
	  this.ev.trigger('currentTab',"user");
  }

}

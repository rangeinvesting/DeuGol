import { Component, OnInit } from '@angular/core';
import { EventsService } from './../../services/utils/events.service';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
	
  loading: boolean = false;

  constructor(private ev: EventsService) {
  	this.ev.on("showLoader", (result: any) => {
		this.loading = this.loading?false:true;
	});
  }

  ngOnInit(): void {
  }

}

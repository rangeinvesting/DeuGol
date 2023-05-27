import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from './../../../../services/utils/events.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

interface JackPotsInterface {
  award_amount:any;
  chance:any;
  desc:any;
  expire:any;
  howtowork:any;
  max_participants:any;
  price:any;
  round:any;
  rules:any;
  status:any;
  title:any;
  winner:any;
  background: any;
}

class JackPotsInterface {
          
  constructor(data: any) {
    if(!data){
      return;
    }
    const jackpots: JackPotsInterface = data;
    return jackpots;
  }
  
}

@Component({
  selector: 'cards-bolao',
  templateUrl: './bolao.component.html',
  styleUrls: ['./bolao.component.css']
})


export class BolaoComponent implements OnInit {

  cDateMillisecs: any;
  tDateMillisecs: any;
  year: number = 2022;
  month: number = 9;
  currentDate: any;
  targetDate: any;
  difference: any;
  seconds: any;
  minutes: any;
  hours: any;
  days: any;
  day: number = 12;
  jackpotsLoaded: boolean = false;

  jackpots: any;

  constructor(private router: Router, public afs: AngularFirestore, private ev: EventsService) { 
    this.jackpots = new JackPotsInterface({});
  }

  getJackPots(){
    //const JackPotsRef: AngularFirestoreDocument<any> = this.afs.collection(`jackpots`);

    this.afs.collection(`jackpots`, ref => ref.where('status','==', 'opened' )).valueChanges({ idField: 'id' }).subscribe((data) => {
      console.log(data)
      if(data[0]){
      this.jackpots = new JackPotsInterface(data[0]);
      this.jackpotsLoaded = true;
      }
    });
  }

  ticketDetails(ticket: any){
    const { id } = ticket;
    this.router.navigate([`ticket-detail`, id]);
    this.ev.trigger('currentTab', 'tickets');
    
  }


  myTimer() {
    this.currentDate = new Date();
    this.targetDate = new Date(2023, 9, 12);
    this.cDateMillisecs = this.currentDate.getTime();
    this.tDateMillisecs = this.targetDate.getTime();
    this.difference = this.tDateMillisecs - this.cDateMillisecs;
    this.seconds = Math.floor(this.difference / 1000);
    this.minutes = Math.floor(this.seconds / 60);
    this.hours = Math.floor(this.minutes / 60);
    this.days = Math.floor(this.hours / 24);

    this.hours %= 24;
    this.minutes %= 60;
    this.seconds %= 60;
    this.hours = this.hours < 10 ? '0' + this.hours : this.hours;
    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;


    setInterval(this.myTimer, 1000);
  }

    ngAfterViewInit() {
    this.getJackPots();
    this.myTimer();
  }

  ngOnInit(): void {
  }

}

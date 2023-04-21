import { Component, OnInit } from '@angular/core';
import { EventsService } from './../../services/utils/events.service';
import { AuthService } from '../../services/auth/auth.service';
import { ProfileService } from './../../services/profile/profile.service';
import { ScoreService } from './../../services/awards/score.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userInfo: any;
  rotate: boolean = false;
  userEmptyFields: any;
  userAwards: any = {
    points: 0,
    level: {
      name: '...',
      badge: null
    }
  };

  constructor(private router: Router, private ev: EventsService, private auth: AuthService, private profile: ProfileService, private score: ScoreService) { 
    this.userInfo = this.auth.me();
    this.userEmptyFields = this.profile.checkPendingUserData();
    this.userInfo.user.photoURL = this.userInfo.user.photoURL || `https://eu.ui-avatars.com/api/?name=${this.userInfo.user.displayName}&size=250`;
    this.score.getUserPoints((scoreData: any)=>{
      this.userAwards.points = scoreData.points; 
      this.userAwards.level = this.score.getLevel(scoreData.points);
      console.log(this.userAwards.level)
    });
  }

  goto(url: any){
      this.router.navigate([url]);
  }

  getInitials(name: any){
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
    let initials = [...name.matchAll(rgx)] || [];

    return (
      (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();
  }

  rotateCard(btn: any){
        this.rotate = this.rotate?false:true;
    }

  doLogout(){
    this.auth.logOut()
  }

  ngOnInit(): void {
	  this.ev.trigger('currentTab',"user");
  }

}

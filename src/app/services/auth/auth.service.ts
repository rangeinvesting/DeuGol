import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../api/base.service';
import { EventsService } from '../utils/events.service';
import { TokenStorageService } from '../utils/token-storage.service';
import { Router } from '@angular/router';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions: any = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private api: BaseService, private token: TokenStorageService, private ev: EventsService) { }

  login(credentials: any): Observable<any> {
    return this.api.post('accounts/login', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions).pipe(map((data:any[])=>{
	  	return data;
	  }));
  }

  register(user: any): Observable<any> {
    return this.api.post('accounts/register', {
      name: user.name,
      email: user.email,
      password: user.password
    }, httpOptions).pipe(map((data:any[])=>{
	  	return data;
	  }));
  }
	
	me(): Observable<any> {
    return this.api.get('accounts/me', httpOptions).pipe(map((data:any[])=>{
	  	return data;
	  }));
  	}
	
	isLogged (){
		return this.token.getToken()
	}
	
	logOut (){
		this.ev.trigger('currentTab',"home");
		this.router.navigate(['home']);
		this.ev.trigger('showAuthModal', { mode: 'login' });
		this.ev.trigger('logon',"off");
		return this.token.logOut()
	}
}
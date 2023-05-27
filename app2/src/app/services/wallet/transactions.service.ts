import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../api/base.service';
import { EventsService } from '../utils/events.service';
import { TokenStorageService } from '../utils/token-storage.service';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions: any = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TransactionsService  {

  constructor(private router: Router, public afs: AngularFirestore, private api: BaseService, private token: TokenStorageService, private ev: EventsService) { }
	
	transactions(): Observable<any> {
	
	const { user } = this.token.getUser();

	  return this.afs.collection(`transactions`, ref => ref.where('useruid','==', user.uid)).valueChanges();
		
	}
	
	isLogged (){
		return this.token.getToken()
	}
	
	logOut (){
		this.ev.trigger('currentTab',"home");
		this.router.navigate(['home']);
		this.ev.trigger('showAuthModal', { mode: 'login' });
		return this.token.logOut()
	}
}

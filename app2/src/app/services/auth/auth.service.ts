import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../api/base.service';
import { EventsService } from '../utils/events.service';
import { TokenStorageService } from '../utils/token-storage.service';
import { Router } from '@angular/router';

import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions: any = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export interface User {
   uid: string;
   email: string;
   displayName: string;
   photoURL: string;
   emailVerified: boolean;
   wallet: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	userData: any; // Save logged in user data
  constructor(
  	public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private router: Router, private api: BaseService, private token: TokenStorageService, private ev: EventsService) { 
  	this.afAuth.authState.subscribe(async(user) => {
  		
      if (user) {
        this.GetUserData(user);
        this.token.saveToken(await user.getIdToken());
      } else {
        this.ev.trigger('showLoader', false);
      }
    });
  }

  checkError(error: any){
    let errors:any = [];
    errors['auth/invalid-email'] = 'O e-mail digitado é inválido, por favor tente outro!';
    errors['auth/email-already-in-use'] = 'O e-mail digitado já existe em nosso banco de dados, por favor tente outro!';
    errors['auth/weak-password'] = 'Você precisa de uma senha mais forte, tente no mínimo 8 caracteres e utilize letras maíusculas, números e simbolos.';
    errors['auth/user-not-found'] = 'Usuário não encontrato, verifique os dados digitados e tente novamente!';
    errors['auth/wrong-password'] = 'Senha inválida, verifique a senha digitada e tente novamente!';
    errors['auth/user-disabled'] = 'Sua conta foi desativada, por favor entre em contato com o suporte!';
    return errors[error]?errors[error]:error;
  }

  ForgotPassword(email: any, cb: any, fb: any) {
    return this.afAuth
      .sendPasswordResetEmail(email)
      .then((result:any) => {
        cb(result);
      })
      .catch((error:any) => {
        console.log(error)
        fb({
          msg: this.checkError(error.code)
        });
      });
  }

  SignIn(credentials: any, cb: any, fb: any) {
    return this.afAuth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((result) => {
        this.afAuth.authState.subscribe(async(user) => {
        if (user) {
      	this.GetUserData(user);
        this.token.saveToken(await user.getIdToken());
        	cb(user);
        }else{
        	fb(false);
        }
        });
      })
      .catch((error) => {
        fb({
          msg: this.checkError(error.code)
        });
      });
  }

  SignUp(user: any, cb: any, fb: any) {
    // Sign up with email/password

    return this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result: any) => {
        this.SendVerificationMail();
        this.SetUserData(result.user, user);
      })
      .catch((error: any) => {
        fb({
          msg: this.checkError(error.code)
        });
      });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        //this.router.navigate(['verify-email-address']);
      });
  }

  SetUserData(user: any, data: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: data.fullname,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      wallet: {
        balance: 0,
        lastBonus: data.lastBonus?data.lastBonus:0
      },
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  GetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    userRef.valueChanges().subscribe(userData => {
        console.log('Atualizou', user)
        setTimeout(()=>{
		  		this.ev.trigger('updateAccountInfo', true);
		  	},500)
	    this.token.saveUser(userData);
		});
  }
	
	me() {
		return this.token.getUser();
  }
	
	isLogged (){
		return this.token.getToken();
	}
	
	logOut (){
		return this.afAuth.signOut().then(() => {
		//this.ev.trigger('showAuthModal', { mode: 'login' });
		setTimeout(()=>{
			this.token.logOut();
			this.ev.trigger('logon',"off");
			this.ev.trigger('showLoader', false);
			this.ev.trigger('currentTab',"home");
			this.router.navigate(['home']);
		},1000);
		})
	}
}
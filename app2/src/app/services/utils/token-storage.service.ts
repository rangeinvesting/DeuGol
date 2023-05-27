import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  logOut() {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(TOKEN_KEY);
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
	let token: any = window.localStorage.getItem(TOKEN_KEY);  
    return token;
  }

  public saveUser(data: any) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify({user: data, wallet: data.wallet}));
  }

  public getUser() {
	   let userData: any = window.localStorage.getItem(USER_KEY);
    return JSON.parse(userData);
  }
}
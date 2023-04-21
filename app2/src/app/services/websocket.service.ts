import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable, Observer, Subject, Subscription } from 'rxjs';
//import { environment } from '../environments/environment';
import { TokenStorageService } from './utils/token-storage.service';

@Injectable()
export class WebsocketService {

  // Our socket connection
  private socket: any;
	private isConnected: boolean = false;

  constructor(private token: TokenStorageService) { if(this.isConnected){return this.socket;} }

  connect(cb: Function){
	  
	var userId: any = '';
	if(this.token.getUser()){
		//userId = this.token.getUser().user.uid;
	}
    // If you aren't familiar with environment variables then
    // you can hard code `environment.ws_url` as `http://localhost:5000`
    this.socket = io(`http://localhost:8070/?user=${userId}`);
	  this.socket.on('connect', (socket: any) => {
	  	this.isConnected = true;
		if(typeof cb === 'function'){
			cb(socket);
		}
	  });
  }
	
	on(event: any, callback: any){
		if(this.isConnected){
		this.socket.on(event, callback);
		}
	}
	
	send(event: any, message: any){
		if(this.isConnected){
		this.socket.emit(event, message);
		}
	}

}
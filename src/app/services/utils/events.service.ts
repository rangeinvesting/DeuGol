import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }
	on(eventType: any, listener: any){
  document.addEventListener(eventType, listener);
}

off(eventType: any, listener: any){
  document.removeEventListener(eventType, listener);
}

once(eventType: any, listener: any){
  this.on(eventType, this.handleEventOnce);
}
	
handleEventOnce(eventType: any, listener: any) {
    listener(eventType);
    this.off(eventType, this.handleEventOnce);
}

trigger(eventType: any, data: any){
  const event = new CustomEvent(eventType, { detail: data });
  document.dispatchEvent(event);
}

}

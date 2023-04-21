import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Games, Game } from '../../games';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private api: BaseService) { }
	
  getGamesByChampionships(){
	  return this.api.get('games/grouped').pipe(map((data:any[])=>{
	  	return new Games(data);
	  }));
  }

	
}

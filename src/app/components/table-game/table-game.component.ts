import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { map, first } from 'rxjs/operators';
import { Observable, Subject } from "rxjs";
import { WebsocketService } from "../../services/websocket.service";
import { BetService } from '../../services/bet.service';
import { GamesService } from '../../services/api/games.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'table-game',
  templateUrl: './table-game.component.html',
  styleUrls: ['./table-game.component.css']
})

export class TableGameComponent implements OnInit {
	
	@Input() sectionTitle = '';
	games: any = [];

  constructor(private apiGameService: GamesService, public betService: BetService, private wsClient: WebsocketService, public gameService: GameService) { 

	this.getGames();
	  
  	}
	
	getGames() {
		this.gameService.getGames().subscribe((result: any) => {
			this.games = result;
		});
	}
	
  ngOnInit(): void {
  }

}

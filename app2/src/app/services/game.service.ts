import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, first } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { BetService } from './bet.service';
import { GamesService } from './api/games.service';
import { CurrentBetInterface } from '../interfaces/bet-interface';

@Injectable({
	providedIn: 'root',
})
export class GameService {
	games: any = [];
	currentBetGames: CurrentBetInterface = {};
	gameUrl: any;
	currentGameId: any;

	constructor(
		private apiGameService: GamesService,
		private betService: BetService,
		private wsClient: WebsocketService
	) {

	}

	getBetClass(gameId: any, bet: any) {
		return this.betService.currentBetGames[`game_${gameId}`]?.bet == bet ? 'active' : '';
	}

	getGames() {
		return this.apiGameService.getGamesByChampionships();
	}

	gameTime(time: string) {
		return moment(time, 'HH:mm:ss').format('HH[h]mm');
	}
	gameDay(someDate: string) {
		let date = moment(someDate).locale('pt-BR');
		if (moment().diff(date, 'days') >= 1) {
			return date.fromNow(); // '2 days ago' etc.
		}
		return date.calendar().split(' ')[0];
	}

	setOdd(odd: any) {
		return odd.toFixed(2).replace('.', ',');
	}

	getOddsButtonColor(odds: any) {
		var colorBg = '#031751',
			color = '#fff';

		if (odds >= 2) {
			colorBg = '#03a9f4';
			color = '#03a9f4';
		}

		if (odds > 2.5) {
			colorBg = '#e53935';
			color = '#e53935';
		}
		
		if (odds < 2) {
			colorBg = 'green';
			color = 'green';
		}

		return {
			borderColor: colorBg,
			color: color,
		};
	}
}
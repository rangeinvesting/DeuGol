import { Injectable } from '@angular/core';
import { BaseService } from './api/base.service';
import { map } from 'rxjs/operators';
import { EventsService } from './utils/events.service';
import { CurrentBetInterface } from '../interfaces/bet-interface';

@Injectable({
	providedIn: 'root',
})
export class BetService {
	public currentBetGames: CurrentBetInterface = {};
	gameUrl: any;
	currentGameId: any;

	constructor(private api: BaseService, private ev: EventsService) {
		if (this.getBetStorage()) {
			this.currentBetGames = this.getBetStorage();
		}
	}

	sendOdd(odd: any, gameUrl: any, cb: any) {
		const viewstate = localStorage.getItem('viewstate');
		const cookie = localStorage.getItem('cookie');
		//this.ev.trigger('showLoader', true);
		this.api
			.post('bet/sendOdd', { odd, gameUrl, viewstate, cookie })
			.pipe(
				map((data: any) => {
					if (data) {
						if (typeof cb === 'function') {
							cb(data);
						}
						this.ev.trigger('setBet', data);
						localStorage.setItem('viewstate', data.viewstate);
						this.ev.trigger('showLoader', false);
					}
				})
			)
			.subscribe((result: any) => {});
	}

	getBetStorage() {
		let currentBetGamesStored: any = localStorage.getItem('currentBetGames');
		return JSON.parse(currentBetGamesStored);
	}

	setBetStorage() {
		const bet: any = {};
		localStorage.setItem('currentBetGames', JSON.stringify(this.currentBetGames));
	}

	getBetClass(gameId: any, bet: any) {
		return this.currentBetGames[`game_${gameId}`]?.bet == bet ? 'active' : '';
	}

	__doPostBack(oddToken: any, all: any) {
		if (this.currentBetGames[`game_${this.currentGameId}`]) {
			this.currentBetGames[`game_${this.currentGameId}`].oddToken = oddToken;
		}
		this.sendOdd(oddToken, this.gameUrl, (data: any) => {
			this.setBetStorage();
		});
	}

	setBetScope(game: any, bet: any) {
		if (!this.currentBetGames[`game_${game.id}`]) {
			console.log('NOVO', game);
			this.currentGameId = game.id;
			this.currentBetGames[`game_${game.id}`] = {
				bet: '',
				oddToken: '',
				oddQuotation: game.mainOdds[bet].odds,
				teamHost: game.host,
				teamGuest: game.guest,
			};
		}
	}

	setBet(func: any, bet: any, game: any, ev?: any) {
		this.setBetScope(game, bet);

		try {
			if (func) {
				if (this.currentBetGames[`game_${game.id}`].bet != bet && !ev.selected) {
					this.currentBetGames[`game_${game.id}`].bet = bet;
					ev.selected = true;
				} else {
					delete this.currentBetGames[`game_${game.id}`];
					ev.selected = false;
				}

				this.gameUrl = game.gameUrl;
				eval(`this.${func}`);
			}
		} catch (e) {
			console.log(e);
		}
	}
}
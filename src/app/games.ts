interface Championship {
	[index: string]: Game;
}

interface GameInterface {
  	championship: any;
	country: any;
	date: any;
	guest: any;
	host: any;
	id: number;
	mainOdds: any;
	moreOddsUrl: any;
	gameUrl: any;
	status: any;
	time: any;
	createdAt: any;
	updatedAt: any;
	getStatus:(status: string) => 'TESTE';
}


class Game {
	constructor(game: GameInterface){
		try{
			game.mainOdds = JSON.parse(game.mainOdds);
			//game.mainOdds = game.mainOdds
			return game;
		}catch(e){
			return {};
		}
	}
}

class Games {
					
	constructor(games: any[]) {
		let ChampionshipsArr:any = [];
		let Championships = Object.keys(games);
		Championships.forEach((_championship: any, i:number)=>{
			var _games = games[_championship].map((game: GameInterface) => {
				return new Game(game);
			});
			ChampionshipsArr.push({
				championship: _championship,
				games: _games
			})
			
		})
		return ChampionshipsArr;
	}
	
}

export {Game, Games}
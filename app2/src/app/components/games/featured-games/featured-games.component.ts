import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  Input,
} from '@angular/core';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface FeaturedGames {
  home: string;
  away: string;
  odds: any;
}

@Component({
  selector: 'featured-games',
  templateUrl: './featured-games.component.html',
  styleUrls: ['./featured-games.component.css'],
})
export class FeaturedGamesComponent implements OnInit {
  @Input() sectionTitle = '';
  url: string =
    'https://m.pgsoft-games.com/126/index.html?ot=82b8b0f88e17ae53611e6dd7f167bc38&btt=2&__refer=m.pg-redirect.com&or=static.pgsoft-games.com#amp=1';
  urlMap: SafeResourceUrl | undefined;
  games: FeaturedGames[] = [];

  loading: boolean = false;

  curPage: number;
  pageSize: number;

  constructor(public sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) {
    this.games = [
      {
        home: 'Vasco',
        away: 'Juventude',
        odds: {
          home: 1.56,
          draw: 2.53,
          away: 3.15,
        },
      },
      {
        home: 'Palmeiras',
        away: 'Corinthians',
        odds: {
          home: 1.26,
          draw: 2.55,
          away: 2.9,
        },
      },
      {
        home: 'Coritiba',
        away: 'CA Paranaense',
        odds: {
          home: 2.5,
          draw: 1.5,
          away: 2.5,
        },
      },
      {
        home: 'Maringรก',
        away: 'Londrina',
        odds: {
          home: 2.53,
          draw: 1.55,
          away: 2.8,
        },
      },
    ];

    this.curPage = 0;
    this.pageSize = 1; // any page size you want
  }

  ngOnInit() {
    this.urlMap = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  getOddsButtonColor(odds: any) {
    var colorBg = '#031751',
      color = '#fff';

    if (odds >= 2) {
      colorBg = '#ff5722';
      color = '#ff5722';
    }

    if (odds > 2.6) {
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

  numberOfPages() {
    return Math.ceil(this.games.length / this.pageSize);
  }

  setCurPage(page: number) {
    let totalItems = this.games.length;
    let cursorPage = page + 1;

    this.loading = true;

    if (cursorPage > totalItems) {
      page = 0;
    }

    if (cursorPage < 1) {
      page = totalItems - 1;
    }

    console.log('Page', page, cursorPage, totalItems, this.curPage);
    setTimeout(() => {
      this.loading = false;
      this.curPage = page;
    }, 1000);
  }

  getCurrentFeuaturedGame() {
    return [this.games[this.curPage]];
  }
}

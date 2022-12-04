import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Game } from 'src/app/common/game';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  games: Game[] = [];
  constructor(private sharedService: SharedService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.listGames();
    this.route.paramMap.subscribe(() => {
      this.listGames();
    });
  }

  listGames(){
    this.sharedService.getGameList().subscribe(
      data => {
        this.games = data;
      }
    );
  }

}

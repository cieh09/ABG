import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/common/game';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  game: Game = new Game;
  constructor(private route: ActivatedRoute, private service: SharedService) { 
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getGameDetails();
    });
  }

  getGameDetails(){
    // 获取 "game/id" 时是string，用“+”转换成int 
    const GameId: number = +this.route.snapshot.paramMap.get('Game_id');
    this.service.getSingleGameContext(GameId).subscribe(
      data =>{
        this.game = data;
      }
    )
  }

}

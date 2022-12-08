import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/common/game';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  user_id: number = 0;
  games: Game[] = [];
  
  constructor(private sharedService: SharedService) { 
    this.user_id = JSON.parse(sessionStorage.getItem('id'));

    console.log(this.user_id);

    this.sharedService.getGamesByUserId(this.user_id).subscribe(data =>{
      this.games = data;
    });
  }

  ngOnInit() {

    // for(let g of this.games){
    //   console.log(g.Game_id);
    // }
  }

}

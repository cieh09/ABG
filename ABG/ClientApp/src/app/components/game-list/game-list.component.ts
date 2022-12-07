import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Game } from 'src/app/common/game';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  games: Game[] = [];
  constructor(private sharedService: SharedService,
     private route: ActivatedRoute, 
     private router: Router,
     private cartService: CartService) { }

  ngOnInit() {
    // this.listGames();
    this.route.paramMap.subscribe(() => {
      this.listGames();
    });
  }

  navigateToGame(g: Game){
    this.router.navigateByUrl('/details?id=' + g.Game_id)
  }

  listGames(){
    this.sharedService.getGameList().subscribe(
      data => {
        this.games = data;
      }
    );
  }

  addToCart(game: Game){
    
    const cartGame = new CartItem(game);
    console.log(cartGame);
    console.log(game.Game_id, game.Price);
    this.cartService.addToCart(cartGame);
  }

}

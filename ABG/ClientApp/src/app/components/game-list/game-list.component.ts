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

  premium_id: number = 0;
  games: Game[] = [];
  constructor(private sharedService: SharedService,
     private route: ActivatedRoute, 
     private router: Router,
     private cartService: CartService) { 
      this.premium_id = JSON.parse(localStorage.getItem('PremiumSale_id'));
      console.log(this.premium_id);
    }

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

    // TODO: 会员情况下需要修改加入购物车的值 原值 * 0.9
    const cartGame = new CartItem(game);
    console.log(cartGame);
    console.log(game.Game_id, game.Price);
    this.cartService.addToCart(cartGame);
  }

}

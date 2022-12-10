import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Game } from 'src/app/common/game';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { Genre } from 'src/app/common/genre';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  premium_id: number = 0;
  games: Game[] = [];
  userOwnedGames: Game[] = [];
  genre: Genre = new Genre;

  constructor(private sharedService: SharedService,
     private route: ActivatedRoute, 
     private router: Router,
     private cartService: CartService) { 
    }

  ngOnInit() {
    // this.listGames();
    this.route.paramMap.subscribe(() => {
      this.listGames();
    });

    this.premium_id = JSON.parse(sessionStorage.getItem('PremiumSale_id'));
    console.log("this.premium_id is: " + this.premium_id);

    // this.userOwnedGames = JSON.parse(sessionStorage.getItem('userOwnedGamesList'));

  }


  navigateToGame(g: Game){
    this.router.navigateByUrl('/details?id=' + g.Game_id)
  }

  listGames(){
    this.sharedService.getGameList().subscribe(
      data => {
        this.games = data;
        this.populateUserOwnedGames();
      }
    );
    
  }

  populateUserOwnedGames() {
    this.sharedService.getGamesByUserId(Number(sessionStorage.getItem('id'))).subscribe(
      data => {
        this.userOwnedGames = [...data];
        this.userOwnedGames.forEach((usergame) => {
          this.games = this.games.filter((allgames) => {
            return JSON.stringify(allgames) !== JSON.stringify(usergame);
          })
         })
      }
    );
  }

  addToCart(game: Game){

    if(this.premium_id != 0 && this.premium_id != null){
      game.Price *= 0.9;
    }

    const cartGame = new CartItem(game);
    console.log(cartGame);
    console.log(game.Game_id, game.Price);
    this.cartService.addToCart(cartGame);
  }

  checkOwnedGames(){
   
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Game } from 'src/app/common/game';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { Genre } from 'src/app/common/genre';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit{
  genre: Genre = new Genre;

  @Input() gameId = '';
  constructor(private sharedService: SharedService,
    ) { 
    }

    ngOnInit(): void {
      this.sharedService.getGenreByGameId(Number(this.gameId)).subscribe(data => {
        this.genre = data;
      })
    }
  }

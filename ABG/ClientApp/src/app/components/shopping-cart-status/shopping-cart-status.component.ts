import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-cart-status',
  templateUrl: './shopping-cart-status.component.html',
  styleUrls: ['./shopping-cart-status.component.css']
})

// 首页购物车图标
export class ShoppingCartStatusComponent implements OnInit {

  totalPrice: number = 0;
  totalQuantity: number = 0;
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.updatePriceAndQuantity();
  }

  updatePriceAndQuantity() {
    // 订阅CartService里计算的总价
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // 订阅CartService里计算的总数
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

}

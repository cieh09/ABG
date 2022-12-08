import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})

// 购物车细节页面
export class ShoppingCartComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.getShoppingCart();
  }

  getShoppingCart() {
    this.cartItems = this.cartService.cartItems;
    // 订阅totalPrice和totalQuantity
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.computePrice();
  }

  removeCartItem(item: CartItem){
    // 获取array里等于这个item的对象
    this.cartService.removeCartItem(item);
  }
}

import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { Checkout } from 'src/app/common/checkout';
import { CartService } from 'src/app/services/cart.service';
import { SharedService } from 'src/app/services/shared.service';

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
  checkoutObj: Checkout = new Checkout();
  constructor(private cartService: CartService, private sharedService: SharedService) { }

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

  checkout(){
    let user_id = JSON.parse(sessionStorage.getItem('id'));
    if(user_id != 0){
      for(let p of this.cartItems){
        this.checkoutObj.User_id = user_id;
        this.checkoutObj.Game_id = p.id;
        this.sharedService.checkout(this.checkoutObj);
      }
    }
  }
}

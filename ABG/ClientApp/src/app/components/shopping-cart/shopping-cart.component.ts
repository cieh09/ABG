import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private cartService: CartService, private sharedService: SharedService, private router: Router) { }

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

    if(user_id == 0 || user_id == null){
      alert('Please login to checkout!');
      this.router.navigateByUrl('login');
      sessionStorage.clear();
    }

    if(user_id != 0 && user_id != null){
      for(let p of this.cartItems){
        let tempCheckout = new Checkout();
        tempCheckout.User_id = user_id;
        // console.log('user_id ' + tempCheckout.User_id);
        tempCheckout.Game_id = p.id;
        // console.log('Game_id ' + tempCheckout.Game_id);
        this.sharedService.checkout(tempCheckout).subscribe(data => {
        });
      }
      alert('Thank you for the purchase!');
      this.router.navigateByUrl('archive');
    }
  }
}

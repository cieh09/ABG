import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0); 
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0); 
  constructor() { }

  addToCart(tempCartItem: CartItem){
    // 看看是否有相同的商品在购物车
    let hasDuplicatedItem: boolean = false;
    let currentCartItem: CartItem = undefined;

    if(this.cartItems.length > 0){
      // 获取当前存在的商品
      for(let c of this.cartItems){
        if(tempCartItem.id == c.id){
          currentCartItem = c;
          console.log("c" + c);
          console.log("currentCartItem" + currentCartItem);
          break;
        }
      }

      hasDuplicatedItem = (currentCartItem != undefined);
    }

    // 存在商品，将这个商品的数量++
    if(hasDuplicatedItem){
      currentCartItem.quantity++;
    }
    // 否则就将商品加入array
    else{
      this.cartItems.push(tempCartItem);
    }

    this.computePrice();
  }

  computePrice() {
    let c_totalPrice: number = 0;
    let c_totalQuantity: number = 0;

    // 计算总和&总数
    for(let c of this.cartItems){
      c_totalPrice += c.price * c.quantity;
      c_totalQuantity += c.quantity;
    }
    
    // subscribe 这两个值，订阅这两个值的都会被更新
    this.totalPrice.next(c_totalPrice);
    this.totalQuantity.next(c_totalQuantity);
    
    this.logData(c_totalPrice, c_totalQuantity);
    
  }

  logData(c_totalPrice: number, c_totalQuantity: number){
    for(let c of this.cartItems){
      const sum = c_totalPrice * c_totalQuantity;
      console.log(`${c.id}, ${c.price}, ${c.quantity}, ${sum} `);
    }

    console.log(c_totalPrice, c_totalQuantity);
  }
}

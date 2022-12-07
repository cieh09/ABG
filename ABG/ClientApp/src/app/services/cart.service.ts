import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  session: Storage = localStorage;
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0); 
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0); 

  constructor() { 
    // 刷新页面走构造函数，重新赋值
    let pageSession = JSON.parse(this.session.getItem('cartItems'));

    if(pageSession != null){
      this.cartItems = pageSession;
      this.computePrice();
    }
  }

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
    this.storeCartItems();
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

  removeCartItem(item: CartItem){
    const index = this.cartItems.findIndex(t => t.id === item.id);

    if(index > -1){
      this.cartItems.splice(index, 1);
    }

    this.computePrice();
    this.storeCartItems();
  }

  storeCartItems(){
    this.session.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}

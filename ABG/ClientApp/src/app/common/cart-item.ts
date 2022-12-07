import { Game } from "./game";

export class CartItem {
    id: number;
    image_Url: string;
    price: number;
    quantity: number;

    constructor(game: Game){
        this.id = game.Game_id;
        this.image_Url = game.ImageUrl;
        this.price = game.Price;
        this.quantity = 1;
    }
}

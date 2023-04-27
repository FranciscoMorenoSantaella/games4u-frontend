import { User } from "./User";

export interface Shoppingcart {
    id:Number,
    ispayed?:Boolean,
    paydate?:Date,
    total_price?:number,
    user:User
  }
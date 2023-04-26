import { Game } from "./Game"
import { Shoppingcart} from "./Shoppingcart";
export interface Order {
    id?:Number
    shoppingcart:Shoppingcart,
    game:Game,
  }
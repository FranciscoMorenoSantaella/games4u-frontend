import { Game } from "./Game";
import { User } from "./User";

export interface UserRating {
    id:number,
    game:Game,
    user:User,
    valoracion:number
}
import { User } from "./User";

export interface Code {
    id:number,
    code:string,
    balance:number,
    used:boolean,
    user:User
}
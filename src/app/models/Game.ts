import { Genre } from "./Genre"
import { Platform } from "./Platform"

export interface Game {
    id:number,
    name:string,
    description:string,
    precio:Number,
    earlyaccess:boolean,
    fechasalida:any,
    genres:Genre[]
    platforms:Platform[];
}
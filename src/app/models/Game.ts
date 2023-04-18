import { Genre } from "./Genre"

export interface Game {
    id:number,
    name:string,
    description:string,
    precio:Number,
    earlyaccess:boolean,
    fechasalida:any,
    genre:Genre[]
}
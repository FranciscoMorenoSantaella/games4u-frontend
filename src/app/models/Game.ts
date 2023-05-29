import { Genre } from "./Genre"
import { Platform } from "./Platform"
import { File } from "./File";
import { UserRating } from "./UserRating";

export interface Game {
    id:number,
    name:string,
    description?:string,
    precio:Number,
    earlyaccess?:boolean,
    fechasalida?:any,
    valoracion:number,
    ratings?:any[],
    genreslist:Genre[],
    platforms:Platform[],
    files:File[]
}
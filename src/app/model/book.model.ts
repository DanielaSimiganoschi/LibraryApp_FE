import { Genre } from "./genre.model";
import { ISBN } from "./isbn.model";

export interface Book {
    id:number;
    title:string;
    publishedDate:Date;
    quantity:number;
    description:string;
    isbns: ISBN[];
    genres: Genre[];
}

import { Author } from "./author.model";
import { Genre } from "./genre.model";
import { ISBN } from "./isbn.model";

export interface Book {
    id:number;
    title:string;
    publishedDate:string;
    quantity:number;
    description:string;
    author:Author;
    isbns: ISBN[];
    genres: Genre[];
}

import { ISBN } from "./isbn.model";

export interface Book {
    id:number;
    title:string;
    publishedDate:any;
    quantity:number;
    description:string;
    isbns: ISBN[];
}

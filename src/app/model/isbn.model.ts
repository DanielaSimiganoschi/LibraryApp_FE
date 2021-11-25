export interface ISBN {
    id: number;
    isbn: string;
    borrowed?: boolean;
    book_id?: number;
}

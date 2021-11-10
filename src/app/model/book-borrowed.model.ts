export interface BookBorrowed {
    id: number;
    isbn: string;
    dateBorrowed: any;
    toBeReturned: any;
    returnedOnTime: boolean;
    returned: boolean;
    patron_id: number;
}

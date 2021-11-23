import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookBorrowed } from 'src/app/model/book-borrowed.model';
import { Book } from 'src/app/model/book.model';
import { ISBN } from 'src/app/model/isbn.model';
import { BookBorrowedService } from 'src/app/service/book-borrowed.service';
import { BookService } from 'src/app/service/book.service';
import { PatronService } from 'src/app/service/patron.service';

@Component({
  selector: 'app-add-edit-book-borrowed',
  templateUrl: './add-edit-book-borrowed.component.html',
  styleUrls: ['./add-edit-book-borrowed.component.css']
})
export class AddEditBookBorrowedComponent implements OnInit {

  public books:Book[] = [];
  public book:Book= {} as Book;
  public bookBorrowed:BookBorrowed= {} as BookBorrowed;
  public isbns: ISBN[] = [];
  public isbn:string = "";
  public idBookBorrowed: number = -1;
  public idPatron: number = -1;
  public isAddMode: boolean = false;

  constructor(private formBuilder: FormBuilder, private bookService: BookService, private bookBorrowedService: BookBorrowedService,private patronService: PatronService,  private route: ActivatedRoute,
    private router: Router) { }

  public form = this.formBuilder.group({
    book: ['', Validators.required],
    isbn: ['', [Validators.required]]
  });



  public getBooks(): void {
    this.bookService.getBooks().subscribe(
      (response: Book[]) => {
        this.books = response;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.router.navigate(['/login']);
        }
      }
    )
  }
  public getISBNS(event:any): void {
    this.bookService.getISBNSforBookId(this.form.get("book")?.value.id).subscribe(
      (response: ISBN[]) => {
        response.forEach(element => {
          if(element.borrowed == false){
            this.isbns.push(element);
          }
        });
      },
      (error: HttpErrorResponse) => {

      }
    )
   
  }

 public checkISBSLength():boolean{
if(this.isbns.length == 0){
  return true;
} return false;
  }

  onISBNChange(event:any){
  this.isbn = event.target.value;
  }

  ngOnInit(): void {
    this.idBookBorrowed = this.route.snapshot.params['idBookBorrowed'];
    this.idPatron = this.route.snapshot.params['idPatron'];
    this.isAddMode = !this.idBookBorrowed;
    this.getBooks();


    if (!this.isAddMode) {
      this.bookBorrowedService.getBookBorrowed(this.idBookBorrowed)
        .subscribe((x: BookBorrowed) => {
          this.bookBorrowed = x;
          console.log(this.bookBorrowed)
          this.form.patchValue(x);
      
        });
  }

  this.form.get("isbn")?.valueChanges.subscribe((value)=>{
    console.log(value);
  })


}
onSubmit():void{
  if (this.isAddMode) {
    this.onAddBookBorrowed();
  } else {
    this.onUpdateBookBorrowed();
  }
}


public onAddBookBorrowed(): void {

  this.bookBorrowed.isbn = this.isbn;
  this.bookBorrowed.patron_id = this.idPatron;

  this.patronService.addBookBorrowed(this.idPatron, this.bookBorrowed).subscribe(
    (response: any) => {
      console.log(this.bookBorrowed);
    },
    (error: HttpErrorResponse) => {
 
    }
  )
}


public onUpdateBookBorrowed(): void {

  // this.book.id = this.idBook;
  // let genresSelected: Genre[] = [];

  // this.genres.forEach((element: any, index: number) => {
  //   let genre: Genre = {} as Genre;
  //   if (element.checked === true) {
  //     genre.id = element.id;
  //     genre.name = element.name;
  //     genresSelected.push(genre);
  //   };
  // });
  // this.book.genres = genresSelected;


  // console.log(this.book);
  // this.bookService.updateBook(this.book).subscribe(
  //   (response: any) => {
  //     console.log(this.book);
  //   },
  //   (error: HttpErrorResponse) => {
  //     console.log(error.message);
  //   }
  // )

}

}

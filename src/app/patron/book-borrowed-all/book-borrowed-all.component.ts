import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookBorrowed } from 'src/app/model/book-borrowed.model';
import { Patron } from 'src/app/model/patron.model';
import { BookBorrowedService } from 'src/app/service/book-borrowed.service';
import { PatronService } from '../../service/patron.service';


@Component({
  selector: 'app-book-borrowed-all',
  templateUrl: './book-borrowed-all.component.html',
  styleUrls: ['./book-borrowed-all.component.css']
})
export class BookBorrowedAllComponent implements OnInit {

  public idPatron: number = -1;
  public isAddMode: boolean = false;
  public patron:Patron = {} as Patron;
  public bookBorrowed:any;

  public booksBorrowed: BookBorrowed[] = [];
  public idToBeDeleted: number = -1;
  public isModalVisible: boolean = false;
  public idToBeReturned: number = -1;
  public isModalVisibleR: boolean = false;

  constructor(private patronService:PatronService, private bookBorrowedService:BookBorrowedService,private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.idPatron= this.route.snapshot.params['id'];
    this.isAddMode = !this.idPatron;
    this.getBooksBorrowed(this.idPatron);
  }

  public getPatronNrBooksAllowed(){
    this.patronService.getPatron(this.idPatron).subscribe(
      (response: Patron) => {
        this.patron = response;
      
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.router.navigate(['/login']);
        }
      }
    )
  }

  public checkButton():boolean{
    if(this.patron.nrBooksAllowed == 0){
      return true;
    }
    return false;
  }
  
  public getBooksBorrowed(id:number): void {
    this.patronService.findBooksBorrowed(id).subscribe(
      (response: BookBorrowed[]) => {
        this.booksBorrowed = response;
      
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.router.navigate(['/login']);
        }
      }
    )
  }

  public returnBook(id:number):void{
    this.idToBeReturned = id;
  }


  public deleteBookBorrowed(id:number):void{

    this.idToBeDeleted = id;
    
    }
    
    public changeModalVisible(){
      this.isModalVisible=true;
    }

    public changeModalVisibleR(){
      this.isModalVisibleR=true;
    }
    
    
    public confirm(){
    console.log(this.idToBeDeleted);
      this.bookBorrowedService.deleteBookBorrowed(this.idToBeDeleted).subscribe(
        (response: any) => {
         
        },
        (error: HttpErrorResponse) => {
         console.log(error.message)
        }
     )
     location.reload();
      }

      public confirmR(){
        console.log(this.idToBeDeleted);
        this.bookBorrowed = this.booksBorrowed.filter(
          book => book.id === this.idToBeReturned);
          console.log(this.bookBorrowed);
          this.bookBorrowed[0].returned = true;
          console.log( this.bookBorrowed[0].returned);
          this.bookBorrowedService.updateBookBorrowed(this.bookBorrowed[0]).subscribe(
            (response: any) => {
             
            },
            (error: HttpErrorResponse) => {
             console.log(error.message)
            }
         )
     location.reload();
          }
      

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Genre } from '../../model/genre.model';
import { GenreService } from '../../service/genre.service';

@Component({
  selector: 'app-genres-all',
  templateUrl: './genres-all.component.html',
  styleUrls: ['./genres-all.component.css']
})
export class GenresAllComponent implements OnInit {

  public idToBeDeleted:number = -1;
  public genres: Genre[] = [];
  public isModalVisible: boolean = false;

  constructor(private genreService: GenreService, private router: Router) { }


  ngOnInit(): void {
    this.getGenres();
  }
  
  public getGenres(): void {
    this.genreService.getGenres().subscribe(
      (response: Genre[]) => {
        this.genres = response;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.router.navigate(['/login']);
        }
      }
    )
  }

public deleteGenre(id:number):void{

this.idToBeDeleted = id;

}

public changeModalVisible(){
  this.isModalVisible=true;
}

public confirm(){
console.log(this.idToBeDeleted);
  this.genreService.deleteGenre(this.idToBeDeleted).subscribe(
    (response: any) => {
     
    },
    (error: HttpErrorResponse) => {
     console.log(error.message)
    }
 )
 this.router.navigate(['books']);
  }
  
}




import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUserService } from '../service/app-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isModalVisible: boolean = false;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logOut(){
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }
  changeModalVisible(){
    this.isModalVisible=true;
  }
}

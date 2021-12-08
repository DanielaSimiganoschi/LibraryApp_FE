import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppUserService } from '../service/app-user.service';
import { UserAuthComponent } from '../user/user-auth/user-auth.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isModalVisible: boolean = false;
  constructor(private router: Router, private appUserService: AppUserService, private jwtHelper: JwtHelperService) { }
  public isAdmin: boolean = this.appUserService.isAdmin();

  ngOnInit(): void {
  }

  public logOut() {
    this.appUserService.logOut();
  }
  changeModalVisible() {
    this.isModalVisible = true;
  }
}

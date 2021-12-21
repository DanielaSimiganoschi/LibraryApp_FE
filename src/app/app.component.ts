import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppUserService } from './service/app-user.service';
import { AuthGuardService } from './service/auth-guard.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AppUserService, private router: Router) { }


}

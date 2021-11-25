import { Component } from '@angular/core';
import '@cds/core/card/register.js';
import { AppUserService } from './service/app-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AppUserService) { }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    this.isLoggedIn();
  }

}

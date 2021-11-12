import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { AppUser } from '../model/app-user.model';
import { LoginUser } from '../model/login-user.model';
import { RoleToUser } from '../model/role-to-user.model';
import { Role } from '../model/role.model';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {


  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  };
  private apiServerURL = environment.apiBaseURL;

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(`${this.apiServerURL}/users/all`);
  }

  public addUser(user: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(`${this.apiServerURL}/users/add`, user);
  }


  public login(username: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post<any>(`${this.apiServerURL}/login`, body, options);
  }


  public addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.apiServerURL}/roles/add`, role);
  }

  public addRoleToUser(roleToUser: RoleToUser): void {
    this.http.post<void>(`${this.apiServerURL}/user/addRole`, roleToUser);
  }

}

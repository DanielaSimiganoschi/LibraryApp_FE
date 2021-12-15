import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { AppUser } from '../model/app-user.model';
import { LoginUser } from '../model/login-user.model';
import { RoleToUser } from '../model/role-to-user.model';
import { Role } from '../model/role.model';
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  private checkTokenInterval = environment.checkTokenInterval;

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  };

  private apiServerURL = environment.apiBaseURL;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) { }

  public getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiServerURL}/roles/all`);
  }

  public getUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(`${this.apiServerURL}/users/all`);
  }

  public addUser(user: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(`${this.apiServerURL}/users/add`, user);
  }

  public isAuthenticated(): boolean {
    let token = localStorage.getItem('access_token') || undefined;
    return !this.jwtHelper.isTokenExpired(token);
  }

  public isAdmin() {

    const roles: String[] = this.jwtHelper.decodeToken(localStorage.getItem("access_token")?.toString())?.roles;
    if (roles.indexOf("ROLE_ADMIN") >= 0) {
      return true;
    }
    return false;
  }

  public hasManagerRights() {

    const roles: String[] = this.jwtHelper.decodeToken(localStorage.getItem("access_token")?.toString())?.roles;
    if (roles.indexOf("ROLE_USER") < 0) {
      return true;
    }
    return false;
  }

  public logOutIfTokenExpired() {

    setInterval(() => {
      if (this.jwtHelper.isTokenExpired(localStorage.getItem('refresh_token')?.toString()) && localStorage.getItem('refresh_token')?.toString() != undefined) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.router.navigate(['login']);
      }
    }, this.checkTokenInterval)
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

  public logOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['login']);
  }

  public callRefreshToken(): Observable<any> {
    const tokenPayload = ({
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('refresh_token') })
    })

    return this.http.get(`${this.apiServerURL}/token/refresh`, tokenPayload);
  }

  public addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.apiServerURL}/roles/add`, role);
  }

  public addRoleToUser(roleToUser: RoleToUser): Observable<void> {
    return this.http.post<void>(`${this.apiServerURL}/user/addRole`, roleToUser);
  }

  public updateUser(user: AppUser): Observable<AppUser> {
    return this.http.put<AppUser>(`${this.apiServerURL}/users/update`, user);
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerURL}/users/delete/${userId}`);
  }

  public getUserById(userId: number): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.apiServerURL}/users/find/${userId}`);
  }

  public getUserByUsername(username: string): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.apiServerURL}/users/findByUsername/${username}`);
  }

  public filter(roleId?: number): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(`${this.apiServerURL}/users/findUsersByRole/${roleId}`);
  }
}

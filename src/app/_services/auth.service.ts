import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs";
import { APIList } from "./apiList"
import { User } from '../_models/User';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;



  constructor(private http: HttpClient, private api: APIList, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }


  login(username: string, password: string): Observable<any> {

    return this.http.post<any>(this.api.MainDomain + this.api.login, {
      EmailID: username,
      Password: password
    }, httpOptions).pipe(map(user => {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
    }));



  }
  Register(model: object): Observable<any> {
    debugger;
    return this.http.post<any>(this.api.MainDomain + this.api.register, model, httpOptions);
  }

  ForgotPassword(Email: string): Observable<any> {
    debugger

    return this.http.post(this.api.MainDomain + this.api.forgotpassword, {
      EmailID: Email,
    }, httpOptions);
  }


  GetClientList(): Observable<any> {
    return this.http.get(this.api.MainDomain + this.api.Getallclinet, httpOptions);
  }
  ApproveClinet(ClinetID: number): Observable<any> {
    return this.http.put(this.api.MainDomain + this.api.ApproveClinet + ClinetID, httpOptions);
  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}

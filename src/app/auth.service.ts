import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  connectedUser:any = null;

  constructor(private http: HttpClient) { 
    this.isLogged();
  }
  isLogged() {
    this.http.get("http://localhost:3000/isLogged",{ withCredentials: true}).subscribe(
      (connectedUser)=>{
        this.connectedUser = connectedUser;
        console.log(this.connectedUser)
        console.log("connected")
      },
      (error)=>{
        console.log("not connected")
      }
  )
  }

  login(login, password):Observable<any>{
    return this.http.post("http://localhost:3000/login",{login:login, password:password}, { withCredentials: true});
  }

  logout():Observable<any>{
    console.log("out ->")
    return this.http.get("http://localhost:3000/logout", { withCredentials: true});
  }

  register(login:any,password:any, fullName:any):Observable<any>{
    return this.http.post("http://localhost:3000/register",{login:login, password:password, fullName:fullName}, { withCredentials: true})
  }


}

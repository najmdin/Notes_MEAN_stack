import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login:any= "";
  password:any="";
  constructor(public AuthService: AuthService) { }

  ngOnInit(): void {
  }

  submit():any{
    this.AuthService.login(this.login, this.password).subscribe(
      (userInfo:any)=>{
        this.AuthService.connectedUser = userInfo;
      },
      (error)=>{
        console.log("error", error)
      }
    )
  }
}

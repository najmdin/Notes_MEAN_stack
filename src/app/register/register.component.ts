import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  login:any ="";
  password:any="";
  fullName:any ="";
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  submit():any{
    this.authService.register(this.login,this.password,this.fullName).subscribe(
      (userInfo:any)=>{
        this.authService.connectedUser = userInfo;
      },
      (error)=>{
        console.log("error", error)
      }
    )
  }
}

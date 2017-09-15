import { Component, OnInit } from '@angular/core';
import { AF } from '../../../providers/af';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public error: any;
  constructor(public afService: AF, private router: Router) { }


  ngOnInit() {
  }

  loginWithGoogle() {
    this.afService.loginWithGoogle().then((data) => {
     // Send them to the homepage if they are logged in
    //   this.afService.addUserInfo();
       this.router.navigate(['']);
    });
  }

  loginWithEmail(event, email, password) {
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then(() => {
     this.router.navigate(['']);
    }).catch((error: any) => {
       if (error) {
         this.error = error;
         console.log(this.error);
       }
    });
  }

}

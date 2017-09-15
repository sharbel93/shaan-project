import { Component, OnInit } from '@angular/core';
import { AF } from '../../../providers/af';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})

// We need to inject Router and our AF provider into the component.
// We also build a register function that will register a user using our new created service functions.
// Upon success we use the Router to send them to the home page.
export class RegistrationPageComponent implements OnInit {
  public error: any;

  constructor(public afService: AF, private router: Router) { }

  ngOnInit() {
  }

  // registers the user and logs them in
  register(event, name, email, password) {
    event.preventDefault();
    this.afService.registerUser(email, password).then((user) => {
      this.afService.saveUserInfoFromForm(user.uid, name, email).then(() => {
        this.router.navigate(['']);
      });
  }).catch((error) => {
    this.error = error;
    console.log(this.error);

  });
}
}

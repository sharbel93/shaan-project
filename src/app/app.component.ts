import { Component } from '@angular/core';
import { AF } from '../app/providers/af';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
public isLoggedIn: boolean;

constructor(public afService: AF, private router: Router) {

    // This asynchronously checks if our user is logged in and will automatically
    // redirect them to the Login page when the status changes.
    // This is just a small thing that Firebase does that makes it easy to use.
    this.afService.afAuth.authState.subscribe((auth) => {
        if (auth == null) {
         console.log('Not Logged in.');

         this.isLoggedIn = false;
         this.router.navigate(['login']);

        } else {
          console.log('Successfully Logged in.');
        // Set the display Name and Email so we can attribute messages to them
          this.afService.displayName = auth.displayName;
          this.afService.email = auth.email;

          this.isLoggedIn = true;
          this.router.navigate(['']);
        }
    });
}

logout() {
  this.afService.logout();
}


}

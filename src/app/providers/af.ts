import { Injectable } from '@angular/core';
// import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AF {
   public messages: FirebaseListObservable<any>;
   public users: FirebaseListObservable<any>;
   public displayName: string;
   public email: string;
   authState: any = null;

    constructor( public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
       // creates a reference to our Firebase database so we can read and write from it
       this.messages = this.db.list('/messages');
       this.afAuth.authState.subscribe((auth) => {
        this.authState = auth;
    });
    }
     // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

    // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

    // Logs in the user
    // @returns {firebase.Promise<FirebaseAuthState>}

    loginWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.socialSignIn(provider);
      }
      // Logs out the current user
      logout() {
          this.afAuth.auth.signOut();
      }
    //  addUserInfo() {
    //      // We saved their auth info now save the rest to the db
    //      this.users.push({
    //          email: this.email,
    //          displayName: this.displayName
    //      });
    //  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
          this.authState = credential.user;
          this.updateUserData();
      })
      .catch(error => console.log(error));
  }

      // Saves a message to the Firebase RealTime Database
      // @param text
      sendMessage(text) {
          const message = {
              message: text,
              displayName: this.displayName,
              email: this.email,
              timestamp: Date.now()
          };
          this.messages.push(message);
      }

    //     Calls the AngularFire2 service to register a new user
    //    @param model
    //   @returns {firebase.Promise<void>}

    registerUser(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
          .then((user) => {
            this.authState = user;
            this.updateUserData();
          })
          .catch(error => console.log('ERROR:', error.message));
      }

    // Saves information to display to screen when user is logged in
    // @param uid
    // @param model
    // @returns {firebase.Promise<void>}

    saveUserInfoFromForm(uid, name, email) {
        return this.db.object('/registeredUsers' + uid).set({
            name: name,
            email: email
        });
    }

    // Logs the user in using their Email/Password combo
    // @param email
    // @param password
    // @returns {firebase.Promise<FirebaseAuthState>}

    loginWithEmail(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
          .then((user) => {
            this.authState = user;
            this.updateUserData();
          })
          .catch(error => console.log(error));
     }

    private updateUserData(): void {
        // Writes user name and email to realtime db
        // useful if your app displays information about users or for admin features
           const path = `users/${this.currentUserId}`; // Endpoint on firebase
           const data = {
                        email: this.authState.email,
                        name: this.authState.displayName
                      };
    this.db.object(path).update(data)
          .catch(error => console.log(error));
        }

}

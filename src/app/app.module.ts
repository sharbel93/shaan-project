import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { SeedModule } from 'angular-message-history-module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { LoginPageComponent } from './messages/login-page/login-page/login-page.component';
import { AF } from './providers/af';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './messages/home-page/home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { RegistrationPageComponent } from './messages/registration-page/registration-page/registration-page.component';
import { MomentModule } from 'angular2-moment';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    RegistrationPageComponent
  ],
  imports: [
    BrowserModule, AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
   RouterModule.forRoot(routes),
   FormsModule,
   MomentModule
  ],
  providers: [AF],
  bootstrap: [AppComponent]
})
export class AppModule { }

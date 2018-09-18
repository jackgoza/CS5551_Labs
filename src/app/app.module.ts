import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';
import { 
  SocialLoginModule, 
  AuthServiceConfig, 
  GoogleLoginProvider,
  FacebookLoginProvider } from 'angular-6-social-login';

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
  [
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("put your durn facebook key here")
    },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("put your dang client key here buds")
    }
  ]
 );
 return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '',
        component: HomeComponent
      }
    ]),
    SocialLoginModule
  ],
  providers: [AuthService, UserService, AuthGuard,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

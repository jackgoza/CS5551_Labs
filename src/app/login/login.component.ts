import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AuthService as SocialAuthService, SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angular-6-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private auth: AuthService,
    private router: Router,
    private socialAuthService: SocialAuthService) { }

  ngOnInit() {
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : ", userData);
        // Now sign-in with userData
        // ...

      }
    );
  }


  loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector("#username").value;
    const password = target.querySelector("#password").value;

    console.log(username, password);

    this.auth.getUserDetails(username, password).subscribe(data => {
      if (data.success) {
        this.router.navigate(['admin']);
        this.auth.setLoggedIn(true);
      } else {
        window.alert('invalid credintials!');
      }
    });
  }
}

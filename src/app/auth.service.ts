import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface myData {
  success: boolean,
  message: string
}

@Injectable()
export class AuthService {

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');
  }

  get isLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString);
  }

  getUserDetails(username, password) {
    // post these details to API server and return user info if correct
    return this.http.post<myData>('/api/auth.php', {
      username,
      password
    });
  }
}

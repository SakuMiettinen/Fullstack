import { Injectable } from "@angular/core";
import { Http, Headers, HttpModule, URLSearchParams } from "@angular/http";
import "rxjs/add/operator/map";
import { tokenNotExpired } from "angular2-jwt";

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) {
    /*
    this.isDev = true; // Change to false before deployment
    */
  }

  registerUser(user) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:3000/users/register", user, { headers: headers })
      .map((res) => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:3000/users/authenticate", user, {
        headers: headers,
      })
      .map((res) => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append("Authorization", this.authToken);
    headers.append("Content-Type", "application/json");
    return this.http
      .get("http://localhost:3000/users/profile", { headers: headers })
      .map((res) => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired("id_token");
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  saveQuote(quoteData) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:3000/users/saveQuote", quoteData, {
        headers: headers,
      })
      .map((res) => res.json());
  }

  getUserQuotes(username) {
    let headers = new Headers();
    this.loadToken();
    headers.append("Authorization", this.authToken);
    headers.append("Content-Type", "application/json");

    let params = new URLSearchParams();
    params.append("username", username);
    return this.http.get(`http://localhost:3000/users/quotes`, {
      headers: headers,
      search: params,
    });
  }

  getFeaturedQuotes() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http
      .get(`http://localhost:3000/users/quotes/featured`, {
        headers: headers,
      })
      .map((res) => res.json());
  }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;

  constructor(public http: Http, public api: Api) {
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('login', accountInfo).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
          this._loggedIn(res);
      }, err => {
        console.log( err);
      });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('users', accountInfo).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
      }, err => {
        console.log(err);
        // console.error('ERROR', err);
      });

    return seq;
  }

  forgottenPwd(mail: String) {
    let seq = this.api.get("forgotten/"+mail).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
      }, err => {
        console.log(err);
      });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    let seq = this.api.get("logout", this._user).share();
    seq
    .map(res => res.json())
    .subscribe(res => {
      this._user = null;
    }, err => {
      this._user = null;
      console.log(err);
    });
    
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
}

import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { FirstRunPage } from '../../pages/pages';
import { MainPage } from '../../pages/pages';
import { User } from '../../providers/user';

import { TranslateService } from '@ngx-translate/core';
var encryption = require("../../providers/encryption.js");

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { firstname: String, lastname: String, email: String, address: String, password: String, car: Boolean, birthdate: Date } = {
      firstname: "",
      lastname: "",
      email: "test",
      address: "",
      password: "",
      car: false,
      birthdate: new Date()
  };

  // Our translated text strings
  private signupErrorString: string;
  private signupSuccessString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    }),this.translateService.get('SIGNUP_SUCCESS').subscribe((value) => {
      this.signupSuccessString = value;
    })
  }

  doSignup() {
    // Attempt to login in through our User service 
      console.log("password avant :" +this.account.password);
      var temp = this.account.password;
      this.account.password=encryption.crypt(this.account.password);
      console.log("password après encryption :" +this.account.password);
      console.log("reproductible :"+(encryption.crypt(temp)==this.account.password));
      this.user.signup(this.account).subscribe((resp) => {
        let toast = this.toastCtrl.create({
          message: this.signupErrorString,
          duration: 5000, 
          position: 'top'
        });
        toast.present();
      this.navCtrl.push(FirstRunPage);
    }, (err) => {
      console.log(this.account);
      this.account.password=""; // on reset le password comme il a été crypté
      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000, 
        position: 'top'
      });
      toast.present();
    });
  }
}

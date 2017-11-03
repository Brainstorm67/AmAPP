import { Component } from '@angular/core';
import { NavController , ToastController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { MainPage } from '../../pages/pages';
import { User } from '../../providers/user';
import { TranslateService } from '@ngx-translate/core';
import { Formulaire } from '../../providers/formulaire';


var encryption = require("../../providers/encryption.js");
import { Api } from '../../providers/api';
/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {


    // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'thomas@pitiot.eu',
    password: 'ycvars8677'
  };

  
  // Our translated text strings
  private loginErrorString: string;
  private wrongMailString: string;
  private unknownMailString: string;
  private wrongPwdString: string;
  private serverErrorString: string;
  private unverifiedMailString: string;
  private resetMailSentString:string;

  constructor(public navCtrl: NavController,
    public user: User,
    public api : Api,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    }),
    this.translateService.get('MAIL_ERROR').subscribe((value) => {
      this.wrongMailString = value;
    }),
    this.translateService.get('MAIL_UNKNOWN').subscribe((value) => {
      this.unknownMailString = value;
    }),
    this.translateService.get('WRONG_PWD').subscribe((value) => {
      this.wrongPwdString = value;
    }),
    this.translateService.get('SERVER_ERROR').subscribe((value) => {
      this.serverErrorString = value;
    }),
    this.translateService.get('UNVERIFIED_MAIL').subscribe((value) => {
      this.unverifiedMailString = value;
    }),
    this.translateService.get('RESET_MAIL_SENT').subscribe((value) => {
      this.resetMailSentString = value;
    })
  }

   // Attempt to login in through our User service
   doLogin() {
     console.log("connection mail "+this.account.email + "passwd : "+this.account.password);
     var temp = this.account.password;
     this.account.password=encryption.crypt(this.account.password);
    this.user.login(this.account).subscribe((resp) => {
        this.navCtrl.push(MainPage); // login OK
        this.account.password=temp;
    }, (err) => {
      this.account.password=temp;
      var toast;
      switch (err.status) {
        case 404 :
          if(err._body=="mot de passe incorrect") {
            // mauvais password
            toast = this.toastCtrl.create({
              message: this.wrongPwdString,
              duration: 3000,
              position: 'top'
            });
          }
          else { // mauvais mail
            toast = this.toastCtrl.create({
              message: this.unknownMailString,
              duration: 3000,
              position: 'top'
            });
          }
          break;
        default :
          // erreur de transmission
          toast = this.toastCtrl.create({
            message: "unknown error",
            duration: 3000,
            position: 'top'
          });
          break;
      }
      toast.present();
    });
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

  forgottenPwd() {
    if(Formulaire.isValidMail(this.account.email)){
      this.user.forgottenPwd(this.account.email).subscribe((resp) => {
        console.log(resp);
        let toast = this.toastCtrl.create({
          message: this.resetMailSentString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }, (err) => {
        var toast;
        switch (err.status) {
          case 404 :
            // adresse mail inconnue
            toast = this.toastCtrl.create({
              message: this.unknownMailString,
              duration: 3000,
              position: 'top'
            }); break;
          case 401 :  // email non validé
            toast = this.toastCtrl.create({
              message: this.unverifiedMailString,
              duration: 3000,
              position: 'top'
            });  break;
          case 500 : // erreur serveur
            toast = this.toastCtrl.create({
              message: this.serverErrorString,
              duration: 3000,
              position: 'top'
            });  break;
          default :
            // erreur de transmission
            toast = this.toastCtrl.create({
              message: "unknown error",
              duration: 3000,
              position: 'top'
            });
            break;
        }
        toast.present();
      });
    }
    else {
      // mauvaise adresse email
      let toast = this.toastCtrl.create({
        message: this.wrongMailString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    
  }
}


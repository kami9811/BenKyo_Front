import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-twitter-login-button',
  templateUrl: './twitter-login-button.component.html',
  styleUrls: ['./twitter-login-button.component.scss'],
})
export class TwitterLoginButtonComponent implements OnInit {

  constructor(
    public authentication: AuthenticationService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
  ) { }

  result: any
  waiting: any

  ngOnInit() {
    // console.log(this.authentication.getUser())
    this.loading();
  }

  loading = async () => {
    this.waiting = await this.loadingController.create({
      message: `読み込み中...⏳`,
      duration: 10000
    })
    await this.waiting.present().then(
      () => {
        this.getAuthRedirectResult();
      }
    )
  }

  getAuthRedirectResult = () => {
    this.authentication.AuthResult()
    .then(result => {
      console.log(result);
      if (result["credential"]) {  // Result is exsisted == logined
        console.log(result["additionalUserInfo"]["profile"]["name"]);
        console.log(result["additionalUserInfo"]["profile"]["id"]);
        console.log(result["additionalUserInfo"]["profile"]["id_str"]);

        localStorage.name = result["additionalUserInfo"]["profile"]["name"];
        localStorage.accessToken = result["credential"]["accessToken"];
        localStorage.secret = result["credential"]["secret"];
        if (result["additionalUserInfo"]["profile"]["protected"] == true) this.alertPrivate();
        else this.authentication.checkAuth("login");
      }
      this.waiting.dismiss();
    })
  }

  alertPrivate = async () => {
    const alert = await this.alertController.create({
      message: '鍵アカウントではサービスの利用が<br>できません🥺',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.authentication.AuthLogout();
        },
      }]
    });
    await alert.present();
  }

  login = () => this.authentication.TwitterAuth();

}

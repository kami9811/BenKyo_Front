import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

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
  ) { }

  result: any
  waiting: any

  ngOnInit() {
    this.authentication.checkAuth("login")
    // console.log(this.authentication.getUser())
    this.loading()
    
  }

  login = () => {
    this.authentication.TwitterAuth()

    // this.authentication.TwitterAuth()
    // .then((result) => {
    //   console.log(result)
    //   this.router.navigate(["home"])
    // }).catch((error) => {
    //   console.log(error)
    // })
  }

  getAuthRedirectResult = () => {
    this.authentication.AuthResult()
    .then((result) => {
      this.waiting.dismiss()
      console.log(result)
      console.log(result["additionalUserInfo"]["profile"]["name"])
      localStorage.name = result["additionalUserInfo"]["profile"]["name"]
      console.log(result["additionalUserInfo"]["profile"]["id"])
      console.log(result["additionalUserInfo"]["profile"]["id_str"])
      // console.log(result["credential"]["accessToken"])
      // console.log(result["credential"]["secret"])
    }).catch((error) => {
      // this.waiting.dismiss()
      console.log(error)
    })
  }

  loading = async () => {
    this.waiting = await this.loadingController.create({
      message: `読み込み中...⏳`,
      duration: 10000
    })
    await this.waiting.present().then(
      () => {
        this.getAuthRedirectResult()
      }
    )
  }

}

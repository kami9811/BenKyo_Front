import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-twitter-login-button',
  templateUrl: './twitter-login-button.component.html',
  styleUrls: ['./twitter-login-button.component.scss'],
})
export class TwitterLoginButtonComponent implements OnInit {

  constructor(
    public authentication: AuthenticationService,
    private router: Router,
  ) { }

  result: any
  state: any

  ngOnInit() {
    this.authentication.checkAuth()
    // console.log(this.authentication.getUser())
    // this.getAuthRedirectResult()
  }

  login = () => {
    this.authentication.TwitterAuth()
    .then((result) => {
      console.log(result)
      this.router.navigate(["home"])
    }).catch((error) => {
      console.log(error)
    })
  }

  getAuthRedirectResult = () => {
    this.authentication.AuthResult()
    .then((result) => {
      console.log(result)
    }).catch((error) => {
      console.log(error)
    })
  }

}

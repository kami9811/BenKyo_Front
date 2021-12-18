import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { TweetService } from 'src/services/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private authentication: AuthenticationService,
    private tweet: TweetService,
  ) {}

  ngOnInit() {
    this.authentication.checkAuth()
    console.log(this.tweet.postTweet(localStorage.name, "勉強"))
  }

}

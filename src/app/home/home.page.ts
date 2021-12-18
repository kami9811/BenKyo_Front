import { Component, OnInit } from '@angular/core';
import { TweetService } from 'src/services/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private tweet: TweetService,
  ) {}

  ngOnInit() {
    console.log(this.tweet.postTweet(localStorage.name, "勉強"))
  }

}

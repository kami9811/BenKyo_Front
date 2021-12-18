import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  constructor(

  ) {}

  base = "http://twitter.com/share?url="
  app_url = "https://oma-ben.firebaseapp.com/room/"
  text_param = "&text="
  hashtag_param = "&hashtags=おま勉"

  postTweet = (user: string, content: string, room_id: Number) => {
    const text = user + "さんが、今から【" + content + "】を勉強します！一緒に勉強しませんか？"

    return this.base + this.app_url + String(room_id) + this.text_param + text + this.hashtag_param
  }

  getTweet = () => {
    
  }
}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  constructor(
    private gs: GlobalService,
  ) {}

  base = "http://twitter.com/share?url="
  app_url = `${window.location.origin}/room/`
  text_param = "&text="
  hashtag_param = "&hashtags=おま勉"

  postTweet = (user: string, content: string, room_id: number, history_id: number): Observable<any> => {
    const text = `${user}さんが、今から【${content}】を勉強します！一緒に勉強しませんか？\n${this.app_url}${room_id} #勉響`
    const path: string = "tweet/tweet"
    const body: { [key: string]: string | number } = {
      "text": text,
      "access_token": localStorage.accessToken,
      "secret": localStorage.secret,
      "history_id": history_id,
    };
    return this.gs.http(environment.url + path, body)

    // const text = user + "さんが、今から【" + content + "】を勉強します！一緒に勉強しませんか？"

    // return this.base + this.app_url + String(room_id) + this.text_param + text + this.hashtag_param
  }

  getTweet = () => {
    
  }
}
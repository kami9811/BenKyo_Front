import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-twitter-logout-button',
  templateUrl: './twitter-logout-button.component.html',
  styleUrls: ['./twitter-logout-button.component.scss'],
})
export class TwitterLogoutButtonComponent implements OnInit {

  constructor(
    public authentication: AuthenticationService,
  ) { }

  ngOnInit() {}

  logout = () => {
    this.authentication.AuthLogout()
  }

}

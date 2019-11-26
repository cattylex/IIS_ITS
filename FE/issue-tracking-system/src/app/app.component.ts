import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'issue-tracking-system';

  loggedIn: boolean = true;

  userLogin() {
    this.loggedIn = true;
  }

  userLogout() {
    this.loggedIn = false;
  }
}

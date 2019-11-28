import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  globals: Globals

  constructor(private router: Router, globals: Globals) {
    this.globals = globals;
  }

  username: string;
  password: string;

  ngOnInit() {
  }

  login() {
    console.log(this.username, this.password);
    if (this.username == "admin" && this.password == "admin12345"){
      this.globals.loggedIn = true;
      this.router.navigate(["home"]);
    }
    else {
      alert("Invalid username or password");
    }
  }
}

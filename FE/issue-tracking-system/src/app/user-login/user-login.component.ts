import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  constructor(private router: Router) { }

  username: string;
  password: string;

  ngOnInit() {
  }

  login() {
    console.log(this.username, this.password);
    if (this.username == "admin" && this.password == "admin12345"){
      this.router.navigate(["tickets"]);
    }
    else {
      alert("Invalid username or password");
    }
  }

}

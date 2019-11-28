import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  globals: Globals

  public loginForm: FormGroup;

  constructor(private router: Router, globals: Globals) {
    this.globals = globals;
  }

  username: string;
  password: string;

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  public onSubmit(logiFormValue) {
    console.log('ide to');
  }

  public hasError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].hasError(errorName);
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

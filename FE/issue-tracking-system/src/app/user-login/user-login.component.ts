import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Globals, LoggedUser } from '../globals';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';

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

  constructor(private router: Router, globals: Globals, private _http: HttpService, private location: Location) {
    this.globals = globals;
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  public hasError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  logIn(logInFormValue) {
    let user = {
      login: logInFormValue.username,
      password: logInFormValue.password
    }
    
    this._http.logIn(user).subscribe(res => {
      let loggedUser = res.body as LoggedUser;
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("loggedUsername", user.login);
      localStorage.setItem("token", loggedUser.token);
      this.globals.setUserLevel();
      this.router.navigate(['home']);
    },
    error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    });
  }
}

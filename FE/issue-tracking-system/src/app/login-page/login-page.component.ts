import { Component, OnInit } from '@angular/core';
import {LoginPageService} from './login-page.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  data: any;

  constructor(private loginService: LoginPageService) { }

  ngOnInit() { // vola sa vzdy jked sa renderuje componenta
    this.data = this.loginService.getAllUsers();
  }

}

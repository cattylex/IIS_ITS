import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    let data: any;
    data = this.http.get('wtf kurva');
    for (let record of data) {
      record = record + 1;
    }
    return data;
  }
}

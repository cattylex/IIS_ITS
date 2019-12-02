import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../error-handler.service';
import { Globals } from '../globals';

export interface UserDetails {
  id: number;
  name: string;
  mail: string;
  login: string;
  type: string;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  public user: UserDetails;
  public showTasks;

  constructor(private _http: HttpService, private route: ActivatedRoute, private errorHandler: ErrorHandlerService, public globals: Globals) { }

  ngOnInit() {
    this.getUserDetails();
  }

  private getUserDetails() {
    let id: string = this.route.snapshot.params['id'];
    
    this._http.getUserDetails(id).subscribe(res => {
      this.user = res as UserDetails;
    },
    error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    })
  }

}

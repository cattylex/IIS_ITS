import { Component, OnInit, Input } from '@angular/core';
import { UserDetails } from '../user-details.component';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  @Input() public user: UserDetails;
  constructor() { }

  ngOnInit() {
  }

}

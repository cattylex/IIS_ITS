import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service' ;

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  brews: Object;

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this._http.getProducts().subscribe(data => {
      this.brews = data;
    });
  }

}

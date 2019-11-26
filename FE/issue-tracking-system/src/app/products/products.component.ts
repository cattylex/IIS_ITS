import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service' ;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  brews: Object;

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this._http.myMethod().subscribe(data => {
      this.brews = data;
    });
  }
}

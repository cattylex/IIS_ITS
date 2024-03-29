import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../error-handler.service';
import { Globals } from '../globals';

export interface ProductDetails {
  id: number;
  name: string;
  manager: number;
  descr: string;
  manager_nickname: string;
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  public product: ProductDetails;
  

  constructor(private _http: HttpService, private route: ActivatedRoute, private errorHandler: ErrorHandlerService, public globals: Globals) { }

  ngOnInit() {
    this.getProductDetails();
  }

  private getProductDetails() {
    let id: string = this.route.snapshot.params['id'];

    return this._http.getProductDetails(id).subscribe(res => {
      this.product = res as ProductDetails;
    },
    error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    })
  }

  public isMyProduct(author: string): boolean {
    if (this.globals.loggedUser == undefined) return false;
    else {
      if (this.globals.loggedUsername == author) return true;
      else return false;
    }
  }

}

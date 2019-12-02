import { Component, OnInit } from '@angular/core';
import { ProductDetails } from '../product-details/product-details.component';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-product-part-details',
  templateUrl: './product-part-details.component.html',
  styleUrls: ['./product-part-details.component.scss']
})
export class ProductPartDetailsComponent implements OnInit {
  public productPartDetails: ProductDetails;

  constructor(private _http: HttpService, private route: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getProductDetails();
  }

  private getProductDetails() {
    let productId: string = this.route.snapshot.params['idP'];
    let productPartId: string = this.route.snapshot.params['idPP'];

    return this._http.getProductPartDetails(productId, productPartId).subscribe(res => {
      this.productPartDetails = res as ProductDetails;
    },
    error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    })
  }

}

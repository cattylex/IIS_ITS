import { Component, OnInit, Input } from '@angular/core';
import { ProductDetails } from 'src/app/product-details/product-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-part-data',
  templateUrl: './product-part-data.component.html',
  styleUrls: ['./product-part-data.component.scss']
})
export class ProductPartDataComponent implements OnInit {
  @Input() productPartDetails: ProductDetails;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  public navigateToProduct(productId: string) {
    this.router.navigate(['/products/' + productId]);
  }

}

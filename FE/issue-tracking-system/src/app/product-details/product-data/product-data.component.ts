import { Component, OnInit, Input } from '@angular/core';
import { ProductDetails } from '../product-details.component';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.scss']
})
export class ProductDataComponent implements OnInit {
  @Input() public product: ProductDetails;
  
  constructor() { }

  ngOnInit() {
  }

}

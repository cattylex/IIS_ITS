import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpService } from 'src/app/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from 'src/app/globals';

export interface ProductPart {
  id: number;
  name: string;
  manager: number;
  descr: string;
}

@Component({
  selector: 'app-product-parts',
  templateUrl: './product-parts.component.html',
  styleUrls: ['./product-parts.component.scss']
})
export class ProductPartsComponent implements OnInit {

  public displayedColumns = ['id', 'name', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<ProductPart>();
  
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute, private globals: Globals) { }

  ngOnInit() {
    this.getProductParts();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getProductParts() {
    this._http.getProductParts(this.route.snapshot.params['id']).subscribe(res => { 
      this.dataSource.data = res as ProductPart[];
    });
  }

  public redirectToDetails(id: number) {
    let productId: string = this.route.snapshot.params['id'];
    let url: string = '/products/' + productId + '/parts/' + id;
    this.router.navigate([url]);
  }
 
  public redirectToUpdate(id: string) {
    
  }
 
  update(){
    this.ngOnInit();
  }

  public deleteProduct(id: string) {
    let productId: string = this.route.snapshot.params['id'];
    this._http.deleteProductPart(productId, id).subscribe();
    this.globals.sleep(500);
    this.ngOnInit();
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public createProductPart() {
    let id: string = this.route.snapshot.params['id'];
    this.router.navigate(['/products/' + id + '/create_part']);
  }

}

import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { HttpService } from '../http.service' ;
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Ticket } from '../tickets/tickets.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Globals } from '../globals';
import { ProductDetails } from '../product-details/product-details.component';
import { UpdateProductDialogComponent } from '../dialogs/update-product-dialog/update-product-dialog.component';

export interface Product {
  id: number;
  name: string;
  descr: string;

  tickets?: Ticket;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

 // public displayedColumns = ['name', 'created', 'description', 'details', 'update', 'delete'];
  // public dataSource = new MatTableDataSource<Ticket>();
  mySubscription: any;
  
  public displayedColumns = ['id', 'name', 'description', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Product>();
  
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private _http: HttpService, private router: Router, private location: Location, private globals: Globals, private dialog: MatDialog) { }

  ngOnInit() {
    this.getTest();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getTest() {
    this._http.getProducts().subscribe(res => {
      this.dataSource.data = res as Product[];
    });
  }

  public redirectToDetails(id: number) {
    let url: string = `/products/${id}`;
    this.router.navigate([url]);
  }
 
  public redirectToUpdate(id: string) {
    let product: ProductDetails;
    this._http.getProductDetails(id).subscribe(res => {
      product = res as ProductDetails;

      let dialogConfig = {
        height: '500px',
        width: '550px',
        disableClose: true,
        data: { product }
      }
  
      let dialogRef = this.dialog.open(UpdateProductDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      })
    });

   
  }

  public deleteProduct(id: string) {
    this._http.deleteProduct(id).subscribe();
    this.globals.sleep(500);
    this.ngOnInit();
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}

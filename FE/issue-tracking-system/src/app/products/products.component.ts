import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { HttpService } from '../http.service' ;
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Ticket } from '../tickets/tickets.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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

  constructor(private _http: HttpService, private router: Router, private location: Location) { }

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
    
  }

  public deleteProduct(id: string) {
    this._http.deleteProduct(id).subscribe();
    this.ngOnInit();
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}

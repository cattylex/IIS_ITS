import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../http.service' ;
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Ticket } from '../tickets/tickets.component';

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

  public displayedColumns = ['name', 'description', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Product>();
  
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private _http: HttpService) { }

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

  public redirectToDetails(id: string) {
    
  }
 
  public redirectToUpdate(id: string) {
    
  }
 
  public redirectToDelete(id: string) {
    
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}

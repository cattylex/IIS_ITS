import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../http.service' ;
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

export interface Ticket {
  id: number;
  name: string;
  created: Date;
  description: string;
}

export interface Test {
  name: string;
  country: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

 // public displayedColumns = ['name', 'created', 'description', 'details', 'update', 'delete'];
  // public dataSource = new MatTableDataSource<Ticket>();

  public displayedColumns = ['name', 'country', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Test>();
  
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
      this.dataSource.data = res as Test[];
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

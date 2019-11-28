import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../http.service' ;
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

export interface Ticket {
  author_nickname: string;
  name: string;
  state: string;
  ticket_id: number;
}

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  // public displayedColumns = ['name', 'created', 'description', 'details', 'update', 'delete'];
  // public dataSource = new MatTableDataSource<Ticket>();

  public displayedColumns = ['name', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Ticket>();
  
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this.getTickets();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getTickets() {
    this._http.getTickets().subscribe(res => {
      this.dataSource.data = res as Ticket[];
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

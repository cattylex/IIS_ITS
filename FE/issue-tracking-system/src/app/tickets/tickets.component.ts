import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../http.service' ;
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

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

  public displayedColumns = ['ticket_id', 'name', 'author_nickname', 'state', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Ticket>();
  
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private _http: HttpService, private router: Router) { }

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

  public redirectToDetails(id: number) {
    console.log(id);
    let url: string = `/tickets/${id}`;
    this.router.navigate([url]);
  }
 
  public redirectToUpdate(id: string) {
    
  }
 
  public redirectToDelete(id: string) {
    
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}

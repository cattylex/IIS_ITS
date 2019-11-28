import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Ticket } from 'src/app/tickets/tickets.component';
import { HttpService } from 'src/app/http.service';
import { Router } from '@angular/router';

export interface Task {

}

@Component({
  selector: 'app-task-data',
  templateUrl: './task-data.component.html',
  styleUrls: ['./task-data.component.scss']
})
export class TaskDataComponent implements OnInit {

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

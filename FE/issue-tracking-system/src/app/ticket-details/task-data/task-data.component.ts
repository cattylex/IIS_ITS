import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Ticket } from 'src/app/tickets/tickets.component';
import { HttpService } from 'src/app/http.service';
import { Router, ActivatedRoute } from '@angular/router';

export interface Task {
  id: number;
  name: string;
  author_id: number;
  author_nickname: string;
  state: string;
}

@Component({
  selector: 'app-task-data',
  templateUrl: './task-data.component.html',
  styleUrls: ['./task-data.component.scss']
})
export class TaskDataComponent implements OnInit {

  public displayedColumns = ['id', 'name', 'author_nickname', 'state', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Task>();
  
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTasks();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getTasks() {
    this._http.getTasks(this.route.snapshot.params['id']).subscribe(res => {
      this.dataSource.data = res as Task[];
    });
  }

  public redirectToDetails(taskId: number) {
    let ticketId: string = this.route.snapshot.params['id'];
    this.router.navigate(['/tickets/' + ticketId + '/tasks/' + taskId]);
  }
 
  public redirectToUpdate(id: string) {
    //TODO
  }
 
  public redirectToDelete(id: string) {
    //TODO
  }

  createTask() {
    let id: string = this.route.snapshot.params['id'];
    this.router.navigate(['/tickets/' + id + '/tasks/create'])
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}

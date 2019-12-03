import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Ticket } from 'src/app/tickets/tickets.component';
import { HttpService } from 'src/app/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from 'src/app/globals';
import { TaskDetails } from 'src/app/task-details/task-details.component';
import { UpdateTaskDialogComponent } from 'src/app/dialogs/update-task-dialog/update-task-dialog.component';
import { ReportTimeComponent } from 'src/app/dialogs/report-time/report-time.component';
import { ChangeStateDialogComponent } from 'src/app/dialogs/change-state-dialog/change-state-dialog.component';
import { ChangeTaskStateDialogComponent } from 'src/app/dialogs/change-task-state-dialog/change-task-state-dialog.component';

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

  public displayedColumns = ['id', 'name', 'author_nickname', 'state', 'details', 'update', 'report_time', 'change_state', 'delete'];
  public dataSource = new MatTableDataSource<Task>();
  
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute, public globals: Globals, private dialog: MatDialog) { }

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
    }, error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    });
  }

  public redirectToDetails(taskId: number) {
    let ticketId: string = this.route.snapshot.params['id'];
    this.router.navigate(['/tickets/' + ticketId + '/tasks/' + taskId]);
  }
 
  public updateTask(taskId: string) {
    let ticketId: string = this.route.snapshot.params['id'];
    let task: TaskDetails;
    this._http.getTaskDetails(ticketId, taskId).subscribe(res => {
      task = res as TaskDetails;

      let dialogConfig = {
        height: '650px',
        width: '550px',
        disableClose: true,
        data: { task }
      }
  
      let dialogRef = this.dialog.open(UpdateTaskDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      })
    }, error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    })
  }
 
  public deleteTask(id: string) {
    let ticketId: string = this.route.snapshot.params['id'];
    this._http.deleteTask(ticketId, id).subscribe(res => {

    }, error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    });
    this.globals.sleep(1500);
    this.ngOnInit();
  }

  createTask() {
    let id: string = this.route.snapshot.params['id'];
    this.router.navigate(['/tickets/' + id + '/tasks/create'])
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public isMyTask(author: string): boolean {
    if (this.globals.loggedUser == undefined) return false;
    else {
      if (this.globals.loggedUsername == author) return true;
      else return false;
    }
  }

  public reportTime(taskId: string) {
    let ticketId: string = this.route.snapshot.params['id'];
    
    let id = {
      ticketId: ticketId,
      taskId: taskId
    }

    let dialogConfig = {
      height: '300px',
      width: '550px',
      disableClose: true,
      data: { id }
    }

    let dialogRef = this.dialog.open(ReportTimeComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
    }, error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    })
  }

  public changeState(taskId: string) {
    let ticketId: string = this.route.snapshot.params['id'];
    
    let id = {
      ticketId: ticketId,
      taskId: taskId
    }

    let dialogConfig = {
      height: '300px',
      width: '550px',
      disableClose: true,
      data: { id }
    }

    let dialogRef = this.dialog.open(ChangeTaskStateDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
    }, error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    })
  }

}

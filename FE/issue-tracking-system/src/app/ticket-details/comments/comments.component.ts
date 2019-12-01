import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { HttpService } from 'src/app/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from 'src/app/globals';
import { CreateCommentDialogComponent } from 'src/app/dialogs/create-comment-dialog/create-comment-dialog.component';

export interface Comment {
  id: number;
  author: string;
  author_id: number;
  creation_date: Date;
  text: string;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  public displayedColumns = ['author', 'date', 'text'];
  public dataSource = new MatTableDataSource<Comment>();
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute, private globals: Globals, private dialog: MatDialog) { }

  ngOnInit() {
    this.getComments();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getComments() {
    this._http.getTicketComments(this.route.snapshot.params['id']).subscribe(res => {
      this.dataSource.data = res as Comment[];
    });
  }
 
  // public updateTask(taskId: string) {
  //   let ticketId: string = this.route.snapshot.params['id'];
  //   let task: TaskDetails;
  //   this._http.getTaskDetails(ticketId, taskId).subscribe(res => {
  //     task = res as TaskDetails;

  //     let dialogConfig = {
  //       height: '650px',
  //       width: '550px',
  //       disableClose: true,
  //       data: { task }
  //     }
  
  //     let dialogRef = this.dialog.open(UpdateTaskDialogComponent, dialogConfig);
  //     dialogRef.afterClosed().subscribe(result => {
  //       this.ngOnInit();
  //     })
  //   })
  // }
 
  // public deleteTask(id: string) {
  //   let ticketId: string = this.route.snapshot.params['id'];
  //   this._http.deleteTask(ticketId, id).subscribe();
  //   this.globals.sleep(500);
  //   this.ngOnInit();
  // }

  public addComment() {
    let ticket = {
      id: this.route.snapshot.params['id']
    }

    let dialogConfig = {
      height: '350px',
      width: '550px',
      disableClose: true,
      data: ticket
    }

    let dialogRef = this.dialog.open(CreateCommentDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
    
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}

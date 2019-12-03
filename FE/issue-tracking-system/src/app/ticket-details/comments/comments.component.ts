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

  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute, public globals: Globals, private dialog: MatDialog) { }

  ngOnInit() {
    this.getComments();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getComments() {
    this._http.getTicketComments(this.route.snapshot.params['id']).subscribe(res => {
      this.dataSource.data = res as Comment[];
    }, error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    });
  }

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
      this.globals.sleep(1500);
      this.ngOnInit();
    })
    
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}

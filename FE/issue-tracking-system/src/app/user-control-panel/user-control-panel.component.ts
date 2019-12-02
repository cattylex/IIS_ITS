import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { UserDetails } from '../user-details/user-details.component';
import { UpdateUserDialogComponent } from '../dialogs/update-user-dialog/update-user-dialog.component';

export interface User {
  id: number;
  login: number;
  type: string;
}

@Component({
  selector: 'app-user-control-panel',
  templateUrl: './user-control-panel.component.html',
  styleUrls: ['./user-control-panel.component.scss']
})
export class UserControlPanelComponent implements OnInit {

  public displayedColumns = ['id', 'login', 'type', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<User>();
  
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private _http: HttpService, private router: Router, public globals: Globals, private dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getUsers() {
    this._http.getUsers().subscribe(res => {
      this.dataSource.data = res as User[];
    }, error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    });
  }

  public redirectToDetails(id: number) {
    let url: string = `/users/${id}`;
    this.router.navigate([url]);
  }
 
  public updateUser(ticketId: string) {
    let user: UserDetails;
    this._http.getUserDetails(ticketId).subscribe(res => {
      user = res as UserDetails;

      let dialogConfig = {
        height: '600px',
        width: '550px',
        disableClose: true,
        data: { user }
      }
  
      let dialogRef = this.dialog.open(UpdateUserDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      })
    }, error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    })
  }
 
  public deleteUser(id: string) {
    this._http.deleteUser(id).subscribe(res => {

    }, error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    });
    this.globals.sleep(700);
    this.ngOnInit();
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}

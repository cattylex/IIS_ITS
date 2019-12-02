import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../http.service' ;
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { timeout } from 'q';
import { Globals } from '../globals';
import { TicketDetails } from '../ticket-details/ticket-details.component';
import { UpdateTaskDialogComponent } from '../dialogs/update-task-dialog/update-task-dialog.component';
import { UpdateTicketDialogComponent } from '../dialogs/update-ticket-dialog/update-ticket-dialog.component';

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

  public displayedColumns = ['ticket_id', 'name', 'state', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Ticket>();
  
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private _http: HttpService, private router: Router, private globals: Globals, private dialog: MatDialog) { }

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
    }, error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    });
  }

  public redirectToDetails(id: number) {
    let url: string = `/tickets/${id}`;
    this.router.navigate([url]);
  }
 
  public updateTicket(ticketId: string) {
    let ticket: TicketDetails;
    this._http.getTicketDetails(ticketId).subscribe(res => {
      ticket = res as TicketDetails;

      let dialogConfig = {
        height: '500px',
        width: '550px',
        disableClose: true,
        data: { ticket }
      }
  
      let dialogRef = this.dialog.open(UpdateTicketDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      })
    }, error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    })
  }
 
  public deleteTicket(id: string) {
    this._http.deleteTicket(id).subscribe(res => {

    }, error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    });
    this.globals.sleep(500);
    this.ngOnInit();
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public isMyTicket(author: string): boolean {
    if (this.globals.loggedUser == undefined) return false;
    else {
      console.log(this.globals.loggedUsername, author);
      if (this.globals.loggedUsername == author) return true;
      else return false;
    }
  }
}

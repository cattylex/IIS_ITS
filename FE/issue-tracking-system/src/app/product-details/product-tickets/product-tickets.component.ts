import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Ticket } from 'src/app/tickets/tickets.component';
import { HttpService } from 'src/app/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from 'src/app/globals';
import { TicketDetails } from 'src/app/ticket-details/ticket-details.component';
import { UpdateTicketDialogComponent } from 'src/app/dialogs/update-ticket-dialog/update-ticket-dialog.component';

@Component({
  selector: 'app-product-tickets',
  templateUrl: './product-tickets.component.html',
  styleUrls: ['./product-tickets.component.scss']
})
export class ProductTicketsComponent implements OnInit {
  public displayedColumns = ['ticket_id', 'name', 'state', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Ticket>();
  
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute, private globals: Globals, private dialog: MatDialog) { }

  ngOnInit() {
    this.getProductTickets();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getProductTickets() {
    this._http.getProductTickets(this.route.snapshot.params['id']).subscribe(res => {
      this.dataSource.data = res as Ticket[];
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
    })
  }
 
  deleteProductTicket(ticketId: string) {
    this._http.deleteTicket(ticketId).subscribe();
    this.globals.sleep(500);
    this.ngOnInit();
  }

  createTicket() {
    let productId: string = this.route.snapshot.params['id'];
    this.router.navigate(['/products/' + productId + '/tickets/create']);
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}

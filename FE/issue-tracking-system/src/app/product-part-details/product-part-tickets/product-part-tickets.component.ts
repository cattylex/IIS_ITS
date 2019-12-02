import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Ticket } from 'src/app/tickets/tickets.component';
import { HttpService } from 'src/app/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { timeout } from 'q';
import { Globals } from 'src/app/globals';
import { TicketDetails } from 'src/app/ticket-details/ticket-details.component';
import { UpdateTicketDialogComponent } from 'src/app/dialogs/update-ticket-dialog/update-ticket-dialog.component';

@Component({
  selector: 'app-product-part-tickets',
  templateUrl: './product-part-tickets.component.html',
  styleUrls: ['./product-part-tickets.component.scss']
})
export class ProductPartTicketsComponent implements OnInit {

  public displayedColumns = ['ticket_id', 'name', 'state', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Ticket>();
  
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute, public globals: Globals, private dialog: MatDialog) { }

  ngOnInit() {
    this.getProductPartTickets();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getProductPartTickets() {
    let productId: string = this.route.snapshot.params['idP'];
    let productPartId: string = this.route.snapshot.params['idPP'];
    this._http.getProductPartTickets(productId, productPartId).subscribe(res => {
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

  createTicket() {
    let productId: string = this.route.snapshot.params['idP'];
    let partId: string = this.route.snapshot.params['idPP'];
    this.router.navigate(['/products/' + productId + '/parts/' + partId + '/tickets/create']);
  }
 
  public deleteProductPartTicket(ticketId: string) {
    this._http.deleteTicket(ticketId).subscribe(res => {

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
      if (this.globals.loggedUsername == author) return true;
      else return false;
    }
  }

}

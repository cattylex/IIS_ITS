import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Ticket } from 'src/app/tickets/tickets.component';
import { HttpService } from 'src/app/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { timeout } from 'q';
import { Globals } from 'src/app/globals';

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

  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute, private globals: Globals) { }

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
    });
  }

  public redirectToDetails(id: number) {
    let url: string = `/tickets/${id}`;
    this.router.navigate([url]);
  }
 
  public redirectToUpdate(id: string) {
    
  }

  createTicket() {
    let productId: string = this.route.snapshot.params['idP'];
    let partId: string = this.route.snapshot.params['idPP'];
    this.router.navigate(['/products/' + productId + '/parts/' + partId + '/tickets/create']);
  }
 
  public deleteProductPartTicket(ticketId: string) {
    this._http.deleteTicket(ticketId).subscribe();
    this.globals.sleep(500);
    this.ngOnInit();
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}

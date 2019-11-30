import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Ticket } from 'src/app/tickets/tickets.component';
import { HttpService } from 'src/app/http.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute) { }

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
 
  public deleteProduct(id: string) {
    this._http.deleteProduct(id).subscribe();
    window.location.reload();
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}

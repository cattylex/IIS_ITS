import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TicketDetails } from '../ticket-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-data',
  templateUrl: './ticket-data.component.html',
  styleUrls: ['./ticket-data.component.scss']
})
export class TicketDataComponent implements OnInit {
  @Input() public ticket: TicketDetails;
  public selectOptions = [{name: 'Show', value: 'show'}, {name: 'Don\'t show', value: ''}];
  @Output() selectEmitt = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public onChange(event) {
    this.selectEmitt.emit(event.value);
  }

  public hasProductPart() {
    if (this.ticket.part_name != null) return true;
    return false;
  }

  public navigateToProduct(productId: string) {
    this.router.navigate(['/products/' + productId]);
  }

  public navigateToProductPart(productId: string, productPartId: string) {
    this.router.navigate(['/products/' + productId + '/parts/' + productPartId]);
  }

}

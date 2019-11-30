import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TicketDetails } from '../ticket-details.component';

@Component({
  selector: 'app-ticket-data',
  templateUrl: './ticket-data.component.html',
  styleUrls: ['./ticket-data.component.scss']
})
export class TicketDataComponent implements OnInit {
  @Input() public ticket: TicketDetails;
  public selectOptions = [{name: 'Show', value: 'show'}, {name: 'Don\'t show', value: ''}];
  @Output() selectEmitt = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onChange(event) {
    this.selectEmitt.emit(event.value);
  }

}

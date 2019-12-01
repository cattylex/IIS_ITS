import { Component, OnInit, ErrorHandler } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../tickets/tickets.component';
import { ErrorHandlerService } from '../error-handler.service';
import { TicketDataComponent } from './ticket-data/ticket-data.component';
import { TaskDataComponent, Task } from './task-data/task-data.component';
import { Globals } from '../globals';

export interface TicketDetails {
  ticket_id: number;
  author_nickname: string;
  name: string;
  state: string;
  creation_date: Date;
  product_id: 42;
  part_name: string;
  description: string;
  images: Array<number>;
  productId?: number;

  tasks?: Task;
}

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  public ticket: TicketDetails;
  public showTasks;

  constructor(private _http: HttpService, private route: ActivatedRoute, private errorHandler: ErrorHandlerService, private globals: Globals) { }

  ngOnInit() {
    this.getTicketDetails();
  }

  private getTicketDetails() {
    let id: string = this.route.snapshot.params['id'];
    
    this._http.getTicketDetails(id).subscribe(res => {
      this.ticket = res as TicketDetails;
    },
    (error) =>{
      this.errorHandler.handleError(error);
    })
  }

}

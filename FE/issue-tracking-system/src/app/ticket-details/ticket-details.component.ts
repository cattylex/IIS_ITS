import { Component, OnInit, ErrorHandler } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../tickets/tickets.component';
import { ErrorHandlerService } from '../error-handler.service';
import { TicketDataComponent } from './ticket-data/ticket-data.component';
import { TaskDataComponent, Task } from './task-data/task-data.component';
import { Globals } from '../globals';

export interface TicketDetails {
  author_id: number;
  author_nickname: string;
  creation_date: Date;
  description: string;
  name: string;
  part_id: number;
  part_name: string;
  product_id: number;
  product_name: string;
  state: string;
  ticket_id: number;
  
  
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

  constructor(private _http: HttpService, private route: ActivatedRoute, private errorHandler: ErrorHandlerService, public globals: Globals) { }

  ngOnInit() {
    this.getTicketDetails();
  }

  private getTicketDetails() {
    let id: string = this.route.snapshot.params['id'];
    
    this._http.getTicketDetails(id).subscribe(res => {
      this.ticket = res as TicketDetails;
    },
    error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    })
  }

}

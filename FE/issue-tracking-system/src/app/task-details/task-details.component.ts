import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../error-handler.service';

export interface TaskDetails {
  id: number;
  ticket: number;
  author: number;
  name: string;
  descr: string;
  state: string;
  ewt: string;
  ats: string;
  created: Date;
  employeee: string;
}

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  public taskDetails: TaskDetails;

  constructor(private _http: HttpService, private route: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getTicketDetails();
  }

  private getTicketDetails() {
    let ticketId: string = this.route.snapshot.params['idTic'];
    let taskId: string = this.route.snapshot.params['idTask'];
    
    this._http.getTaskDetails(ticketId, taskId).subscribe(res => {
      this.taskDetails = res as TaskDetails;
    },
    (error) =>{
      this.errorHandler.handleError(error);
    })
  }

}

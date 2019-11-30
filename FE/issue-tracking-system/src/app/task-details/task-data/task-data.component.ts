import { Component, OnInit, Input } from '@angular/core';
import { TaskDetails } from '../task-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-task-data',
  templateUrl: './task-data.component.html',
  styleUrls: ['./task-data.component.scss']
})
export class TaskDetailsDataComponent implements OnInit {
  @Input() taskDetails: TaskDetails;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  public navigateToTicket(ticketId: string) {
    this.router.navigate(['/tickets/' + ticketId]);
  }

}

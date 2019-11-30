import { Component, OnInit, Input } from '@angular/core';
import { TaskDetails } from '../task-details.component';

@Component({
  selector: 'app-details-task-data',
  templateUrl: './task-data.component.html',
  styleUrls: ['./task-data.component.scss']
})
export class TaskDetailsDataComponent implements OnInit {
  @Input() taskDetails: TaskDetails;
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';


export interface Task {

}

@Component({
  selector: 'app-task-data',
  templateUrl: './task-data.component.html',
  styleUrls: ['./task-data.component.scss']
})
export class TaskDataComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

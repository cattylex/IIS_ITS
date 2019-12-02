import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdateProductPartDialogComponent } from '../update-product-part-dialog/update-product-part-dialog.component';

export interface UpdatedTask {
  name: string;
  descr: string;
  state: string;
  ats: number;
  manager: number; //TODO employee
}

@Component({
  selector: 'app-update-task-dialog',
  templateUrl: './update-task-dialog.component.html',
  styleUrls: ['./update-task-dialog.component.scss']
})
export class UpdateTaskDialogComponent implements OnInit {

  public updateTaskForm: FormGroup;

  constructor(private _http: HttpService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UpdateProductPartDialogComponent>) { }

  ngOnInit() {
    this.updateTaskForm = new FormGroup({
      name: new FormControl(this.data.task.name, [Validators.maxLength(60), Validators.required]),
      descr: new FormControl(this.data.task.descr, [Validators.required]),
      manager: new FormControl(),
      ats: new FormControl(this.data.task.ats, [Validators.required, Validators.min(0)]),
      state: new FormControl(this.data.task.state, [Validators.required])
    })
  }

  public hasError(controlName: string, errorName: string) {
    return this.updateTaskForm.controls[controlName].hasError(errorName);
  }

  public updateTask(updateTaskFormValue) {
    if (this.updateTaskForm.valid) {
      let updatedTask: UpdatedTask = {
        name: updateTaskFormValue.name,
        descr: updateTaskFormValue.descr,
        ats: updateTaskFormValue.ats,
        state: updateTaskFormValue.state,
        manager: null
      }

      this._http.updateTask(this.data.task.ticket, this.data.task.id, updatedTask).subscribe(res => {

      }, error => {
        let errorMessage = JSON.parse(JSON.stringify(error.error));
        alert(errorMessage.error); //TODO
      });

      this.dialogRef.close();
      
    }

  }

}

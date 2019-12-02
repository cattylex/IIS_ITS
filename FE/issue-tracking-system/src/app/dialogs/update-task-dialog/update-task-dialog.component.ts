import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdateProductPartDialogComponent } from '../update-product-part-dialog/update-product-part-dialog.component';
import { Manager } from 'src/app/register-new-product/register-new-product.component';

export interface UpdatedTask {
  name: string;
  descr: string;
  ats: number;
  employee: number; //TODO employee
}

@Component({
  selector: 'app-update-task-dialog',
  templateUrl: './update-task-dialog.component.html',
  styleUrls: ['./update-task-dialog.component.scss']
})
export class UpdateTaskDialogComponent implements OnInit {
  public employees;
  public updateTaskForm: FormGroup;

  constructor(private _http: HttpService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UpdateProductPartDialogComponent>) { }

  ngOnInit() {
    this.updateTaskForm = new FormGroup({
      name: new FormControl(this.data.task.name, [Validators.maxLength(60), Validators.required]),
      descr: new FormControl(this.data.task.descr, [Validators.required]),
      ats: new FormControl(this.data.task.ats, [Validators.required, Validators.min(0)]),
      employee: new FormControl(this.data.task.state, [Validators.required])
    })

    this.getEmployees();
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
        employee: updateTaskFormValue.employee
      }

      this._http.updateTask(this.data.task.ticket, this.data.task.id, updatedTask).subscribe(res => {

      }, error => {
        let errorMessage = JSON.parse(JSON.stringify(error.error));
        alert(errorMessage.error); //TODO
      });

      this.dialogRef.close();
      
    }
  }

  public getEmployees() {
    this._http.getEmployees().subscribe(res => {
      this.employees = res as Manager[];
    }, 
    error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    });
  }

}

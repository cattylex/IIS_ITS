import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdateProductPartDialogComponent } from '../update-product-part-dialog/update-product-part-dialog.component';
import { UpdatedTask } from '../update-task-dialog/update-task-dialog.component';
import { Manager } from 'src/app/register-new-product/register-new-product.component';

@Component({
  selector: 'app-report-time',
  templateUrl: './report-time.component.html',
  styleUrls: ['./report-time.component.scss']
})
export class ReportTimeComponent implements OnInit {
  public reportTimeForm: FormGroup;

  constructor(private _http: HttpService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UpdateProductPartDialogComponent>) { }

  ngOnInit() {
    this.reportTimeForm = new FormGroup({
      ats: new FormControl('', [Validators.required, Validators.min(0)]),
    })
  }

  public hasError(controlName: string, errorName: string) {
    return this.reportTimeForm.controls[controlName].hasError(errorName);
  }

  public reportTime(reportTimeFormValue) {
    if (this.reportTimeForm.valid) {
      let ats = {
        hours: reportTimeFormValue.ats
      }

      this._http.reportTime(this.data.id.ticketId, this.data.id.taskId, ats).subscribe(res => {

      }, error => {
        let errorMessage = JSON.parse(JSON.stringify(error.error));
        alert(errorMessage.error); //TODO
      });

      this.dialogRef.close();
      
    }
  }
}

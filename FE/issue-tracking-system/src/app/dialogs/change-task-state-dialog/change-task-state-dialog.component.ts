import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdateProductPartDialogComponent } from '../update-product-part-dialog/update-product-part-dialog.component';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-change-task-state-dialog',
  templateUrl: './change-task-state-dialog.component.html',
  styleUrls: ['./change-task-state-dialog.component.scss']
})
export class ChangeTaskStateDialogComponent implements OnInit {

  public changeStateForm: FormGroup;

  constructor(private _http: HttpService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UpdateProductPartDialogComponent>, public globals: Globals) { }

  ngOnInit() {
    this.changeStateForm = new FormGroup({
      state: new FormControl('', [Validators.required])
    })
  }

  public hasError(controlName: string, errorName: string) {
    return this.changeStateForm.controls[controlName].hasError(errorName);
  }

  public changeState(changeStateFormValue) {
    if (this.changeStateForm.valid) {
      let state = {
        state: changeStateFormValue.state
      }

      this._http.changeState(this.data.id.ticketId, this.data.id.taskId, state).subscribe(res => {

      }, error => {
        let errorMessage = JSON.parse(JSON.stringify(error.error));
        alert(errorMessage.error); //TODO
      });

      this.dialogRef.close();
      
    }
  }

}

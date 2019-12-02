import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { MatDialog } from '@angular/material';
import { ErrorHandlerService } from '../error-handler.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SuccessDialogComponent } from '../create-new-ticket/success-dialog/success-dialog.component';

export interface TaskToCreate {
  author: number;
  name: string;
  descr: string;
  ewt: number;
}

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  public taskForm: FormGroup;
  private dialogConfig;

  constructor(private location: Location, private _http: HttpService, private dialog: MatDialog, private errorService:ErrorHandlerService, private route: ActivatedRoute) {  }

  ngOnInit() {
    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      descr: new FormControl('', [Validators.required]),
      ewt: new FormControl('', [Validators.min(0)])
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    }
  }

  public hasError(controlName: string, errorName: string) {
    return this.taskForm.controls[controlName].hasError(errorName);
  }

  public onCancel(): void {
    this.location.back();
  }

  public onSubmit(ticketFormValue) {
    if (this.taskForm.valid){
      this.createTicket(ticketFormValue);
    }
  }

  private createTicket(ticketFormValue) {
    let task: TaskToCreate = {
      author: 8,
      name: ticketFormValue.name,
      descr: ticketFormValue.descr,
      ewt: ticketFormValue.ewt
    }
    let id: string = this.route.snapshot.params['id'];

    this._http.createTask(id, task).subscribe(res=> {
      let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
      this.location.back();
      })
    },
    error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    })
  }
}

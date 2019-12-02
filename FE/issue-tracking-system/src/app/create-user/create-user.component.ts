import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { MatDialog } from '@angular/material';
import { ErrorHandlerService } from '../error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { TaskToCreate } from '../create-task/create-task.component';
import { SuccessDialogComponent } from '../create-new-ticket/success-dialog/success-dialog.component';
import { UpdatedUser } from '../dialogs/update-user-dialog/update-user-dialog.component';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public createUserForm: FormGroup;
  private dialogConfig;

  constructor(private location: Location, private _http: HttpService, private dialog: MatDialog, private errorService:ErrorHandlerService, private route: ActivatedRoute) {  }

  ngOnInit() {
    this.createUserForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    }
  }

  public hasError(controlName: string, errorName: string) {
    return this.createUserForm.controls[controlName].hasError(errorName);
  }

  public onCancel(): void {
    this.location.back();
  }

  public onSubmit(createUserFormValue) {
    if (this.createUserForm.valid){
      this.createUser(createUserFormValue);
    }
  }

  private createUser(createUserFormValue) {
    let user: UpdatedUser = {
      name: createUserFormValue.name,
      mail: createUserFormValue.mail,
      login: createUserFormValue.login,
      password: createUserFormValue.password,
      type: createUserFormValue.type
    }

    this._http.createUser(user).subscribe(res=> {
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

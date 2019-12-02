import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdateProductPartDialogComponent } from '../update-product-part-dialog/update-product-part-dialog.component';
import { UpdatedTicket } from '../update-ticket-dialog/update-ticket-dialog.component';
import { UserDetails } from 'src/app/user-details/user-details.component';

export interface UpdatedUser {
  name: string;
  mail: string;
  login: string;
  password: string;
  type: string;
}

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.scss']
})
export class UpdateUserDialogComponent implements OnInit {

  public updateUserForm: FormGroup;

  constructor(private _http: HttpService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UpdateProductPartDialogComponent>) { }

  ngOnInit() {
    this.updateUserForm = new FormGroup({
      name: new FormControl(this.data.user.name, [Validators.maxLength(20), Validators.required]),
      mail: new FormControl(this.data.user.mail, [Validators.required]),
      login: new FormControl(this.data.user.login, [Validators.required]),
      password: new FormControl(this.data.user.password, [Validators.required]),
      type: new FormControl(this.data.user.type, [Validators.required]),
    })
  }

  public hasError(controlName: string, errorName: string) {
    return this.updateUserForm.controls[controlName].hasError(errorName);
  }

  public updateUser(updateUserFormValue) {
    if (this.updateUserForm.valid) {
      let updatedUser: UpdatedUser = {
        name: updateUserFormValue.name,
        mail: updateUserFormValue.mail,
        login: updateUserFormValue.login,
        password: updateUserFormValue.password,
        type: updateUserFormValue.type
      }
      
      this._http.updateUser(this.data.user.id, updatedUser).subscribe(res => {

      }, error => {
        let errorMessage = JSON.parse(JSON.stringify(error.error));
        alert(errorMessage.error); //TODO
      });

      this.dialogRef.close();
      
    }

  }


}

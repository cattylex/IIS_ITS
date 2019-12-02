import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { MatDialog } from '@angular/material';
import { ErrorHandlerService } from '../error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { UpdatedUser } from '../dialogs/update-user-dialog/update-user-dialog.component';
import { SuccessDialogComponent } from '../create-new-ticket/success-dialog/success-dialog.component';
import { Globals } from '../globals';
import { UserDetails } from '../user-details/user-details.component';

export interface ThisUser {
  name: string;
  mail: string;
  login: string;
  password: string;
  type: string;
}

export interface HelpMeOuttaThis {
  id: number;
  name: string;
  mail: string;
  login: string;
  password: string;
  type: string;
}

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  public user: HelpMeOuttaThis;
  public updateUserForm: FormGroup;
  private dialogConfig;

  constructor(private location: Location, private _http: HttpService, private dialog: MatDialog, private errorService:ErrorHandlerService, private route: ActivatedRoute, public globals: Globals) {  }

  ngOnInit() {
    this.updateUserForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),});

    this._http.getUserDetails(this.globals.loggedUser.id.toString()).subscribe(res => {
      let user = res as HelpMeOuttaThis;

      this.updateUserForm = new FormGroup({
        name: new FormControl(user.name, [Validators.required, Validators.maxLength(20)]),
        mail: new FormControl(user.mail, [Validators.required, Validators.email]),
        login: new FormControl(user.login, [Validators.required]),
        password: new FormControl(user.password, [Validators.required]),
      });
    },
    error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    })

    
  }

  public hasError(controlName: string, errorName: string) {
    return this.updateUserForm.controls[controlName].hasError(errorName);
  }

  public onCancel(): void {
    this.location.back();
  }

  public onSubmit(createUserFormValue) {
    if (this.updateUserForm.valid){
      this.updateUser(createUserFormValue);
    }
  }

  private updateUser(createUserFormValue) {
    let user: ThisUser = {
      name: createUserFormValue.name,
      mail: createUserFormValue.mail,
      login: createUserFormValue.login,
      password: createUserFormValue.password,
      type: this.globals.loggedUser.logged_as
    }

    this._http.updateUser(this.globals.loggedUser.id.toString(), user).subscribe(res=> {
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

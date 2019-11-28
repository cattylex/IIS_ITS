import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})

export class ErrorHandlerService {
  public errorMessage: string = '';
  public dialogConfig;
 
  constructor(private router: Router, private dialog: MatDialog) { }

  private createErrorMessage(error: HttpErrorResponse){
    this.errorMessage = error.error ? error.error : error.statusText;
  }
  
  private handleOtherError(error: HttpErrorResponse){
      this.createErrorMessage(error);
      this.dialogConfig.data = { 'errorMessage': this.errorMessage };
      this.dialog.open(ErrorDialogComponent, this.dialogConfig);
    }
}
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { MatDialog } from '@angular/material';
import { ErrorHandlerService } from '../error-handler.service';
import { Ticket } from '../tickets/tickets.component';
import { SuccessDialogComponent } from '../create-new-ticket/success-dialog/success-dialog.component';
import { Location } from '@angular/common';

export interface ProductToRegister {
  name: string;
  manager: number;
  descr: string;
}

export interface Manager {
  id: number;
  login: string;
  type: string;
}

@Component({
  selector: 'app-register-new-product',
  templateUrl: './register-new-product.component.html',
  styleUrls: ['./register-new-product.component.scss']
})
export class RegisterNewProductComponent implements OnInit {

  public managers;
  public productForm: FormGroup;
  private dialogConfig;

  constructor(private location: Location, private _http: HttpService, private dialog: MatDialog, private errorService:ErrorHandlerService) {  }

  ngOnInit() {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      description: new FormControl('', [Validators.required]),
      manager: new FormControl('', [Validators.required])
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    }

    this.getManagers();
  }

  public hasError(controlName: string, errorName: string) {
    return this.productForm.controls[controlName].hasError(errorName);
  }

  public onCancel(): void {
    this.location.back();
  }

  public onSubmit(ticketFormValue) {
    if (this.productForm.valid){
      this.createTicket(ticketFormValue);
    }
  }

  private createTicket(ticketFormValue) {
    let product: ProductToRegister = {
      name: ticketFormValue.name,
      descr: ticketFormValue.description,
      manager: ticketFormValue.manager
    }

    this._http.registerProduct(product).subscribe(res=> {
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

  public getManagers() {
    this._http.getManagers().subscribe(res => {
      this.managers = res as Manager[];
    }, 
    error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    });
  }


}


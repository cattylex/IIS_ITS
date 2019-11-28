import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpService } from '../http.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../error-handler.service';
import { Ticket } from '../tickets/tickets.component';


export interface TicketToCreate {
  name: string;
  description: string;
  product: string;
}

@Component({
  selector: 'app-create-new-ticket',
  templateUrl: './create-new-ticket.component.html',
  styleUrls: ['./create-new-ticket.component.scss']
})
export class CreateNewTicketComponent implements OnInit {

  public products;
  public ticketForm: FormGroup;
  private dialogConfig;

  constructor(private location: Location, private _http: HttpService, private dialog: MatDialog, private errorService:ErrorHandlerService) {  }

  ngOnInit() {
    this.ticketForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      description: new FormControl('', [Validators.required]),
      product: new FormControl('', [Validators.required])
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    }

    this.getProducts();
  }

  public hasError(controlName: string, errorName: string) {
    return this.ticketForm.controls[controlName].hasError(errorName);
  }

  public onCancel(): void {
    this.location.back();
  }

  public onSubmit(ticketFormValue) {
    if (this.ticketForm.valid){
      this.createTicket(ticketFormValue);
    }
  }

  private createTicket(ticketFormValue) {
    let ticket: TicketToCreate = {
      name: ticketFormValue.name,
      description: ticketFormValue.description,
      product: ticketFormValue.product 
    }

    console.log(ticket);
    let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
 
    dialogRef.afterClosed().subscribe(result => {
        this.location.back();
      }, 
      (error => {
        this.errorService.dialogConfig = { ...this.dialogConfig };
        this.errorService.handleError(error);
      }));

  }

  public getProducts() {
    this._http.getTickets().subscribe(res => {
      this.products = res as Ticket[];
    });
  }

}

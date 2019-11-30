import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpService } from '../http.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../error-handler.service';
import { Ticket } from '../tickets/tickets.component';
import { ProductPart } from '../product-details/product-parts/product-parts.component';


export interface TicketToCreate {
  author_id: number;
  name: string;
  descr: string;
  product: number;
  product_part: number;
}

@Component({
  selector: 'app-create-new-ticket',
  templateUrl: './create-new-ticket.component.html',
  styleUrls: ['./create-new-ticket.component.scss']
})
export class CreateNewTicketComponent implements OnInit {

  public products;
  public productParts;

  public ticketForm: FormGroup;
  private dialogConfig;

  constructor(private location: Location, private _http: HttpService, private dialog: MatDialog, private errorService:ErrorHandlerService) {  }

  ngOnInit() {
    this.ticketForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      description: new FormControl('', [Validators.required]),
      product: new FormControl('', [Validators.required]),
      productPart: new FormControl()
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
      author_id: 8,
      name: ticketFormValue.name,
      descr: ticketFormValue.description,
      product: ticketFormValue.product,
      product_part: ticketFormValue.productPart
    }


    console.log(ticket);
    this._http.createTicket(ticket).subscribe(res=> {
      let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
      this.location.back();
      })
    },
    (error => {
      this.errorService.dialogConfig = { ...this.dialogConfig };
      this.errorService.handleError(error);
    })
    )
  }

  public getProducts() {
    this._http.getProducts().subscribe(res => {
      this.products = res as Ticket[];
    });
  }

  public getProductParts(productId: string) {
    this._http.getProductParts(productId).subscribe( res => {
      this.productParts = res as ProductPart[];
    });

    console.log(this.productParts);
  }

}

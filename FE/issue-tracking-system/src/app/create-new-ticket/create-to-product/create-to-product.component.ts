import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { MatDialog } from '@angular/material';
import { ErrorHandlerService } from 'src/app/error-handler.service';
import { Location } from '@angular/common';
import { TicketToCreate } from '../create-new-ticket.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-to-product',
  templateUrl: './create-to-product.component.html',
  styleUrls: ['./create-to-product.component.scss']
})
export class CreateToProductComponent implements OnInit {

  public ticketForm: FormGroup;
  private dialogConfig;

  constructor(private location: Location, private _http: HttpService, private dialog: MatDialog, private errorService:ErrorHandlerService, private route: ActivatedRoute) {  }

  ngOnInit() {
    this.ticketForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      description: new FormControl('', [Validators.required])
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    }
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
    let productId: number = this.route.snapshot.params['id'];
    let ticket: TicketToCreate = {
      author_id: 8,
      name: ticketFormValue.name,
      descr: ticketFormValue.description,
      product: productId,
      product_part: null
    }
    
    this._http.createTicket(ticket).subscribe(res=> {
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

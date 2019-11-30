import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { MatDialog } from '@angular/material';
import { ErrorHandlerService } from 'src/app/error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TicketToCreate } from '../create-new-ticket.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-create-to-product-part',
  templateUrl: './create-to-product-part.component.html',
  styleUrls: ['./create-to-product-part.component.scss']
})
export class CreateToProductPartComponent implements OnInit {

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
    let productId: number = this.route.snapshot.params['idP'];
    let partId: number = this.route.snapshot.params['idPP'];
    let ticket: TicketToCreate = {
      author_id: 8,
      name: ticketFormValue.name,
      descr: ticketFormValue.description,
      product: productId,
      product_part: partId
    }
    
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

}

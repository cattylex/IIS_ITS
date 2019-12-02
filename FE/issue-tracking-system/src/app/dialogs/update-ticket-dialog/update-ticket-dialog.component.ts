import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdateProductPartDialogComponent } from '../update-product-part-dialog/update-product-part-dialog.component';
import { Globals } from 'src/app/globals';

export interface UpdatedTicket {
  product: number;
  product_part: number;
  name: string;
  state: string;
  descr: string;
}

@Component({
  selector: 'app-update-ticket-dialog',
  templateUrl: './update-ticket-dialog.component.html',
  styleUrls: ['./update-ticket-dialog.component.scss']
})
export class UpdateTicketDialogComponent implements OnInit {

  public updateTicketForm: FormGroup;

  constructor(private _http: HttpService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UpdateProductPartDialogComponent>, public globals: Globals) { }

  ngOnInit() {
    this.updateTicketForm = new FormGroup({
      name: new FormControl(this.data.ticket.name, [Validators.maxLength(60), Validators.required]),
      descr: new FormControl(this.data.ticket.description, [Validators.required]),
      state: new FormControl(this.data.ticket.state, [Validators.required])
    })
  }

  public hasError(controlName: string, errorName: string) {
    return this.updateTicketForm.controls[controlName].hasError(errorName);
  }

  public updateTicket(updateTicketFormValue) {
    if (this.updateTicketForm.valid) {
      let updatedTicket: UpdatedTicket = {
        product: this.data.ticket.product_id,
        product_part: this.data.ticket.part_id,
        name: updateTicketFormValue.name,
        descr: updateTicketFormValue.descr,
        state: updateTicketFormValue.state
      }
      
      this._http.updateTicket(this.data.ticket.ticket_id, updatedTicket).subscribe(res => {

      }, error => {
        let errorMessage = JSON.parse(JSON.stringify(error.error));
        alert(errorMessage.error); //TODO
      });

      this.dialogRef.close();
      
    }
  }
}

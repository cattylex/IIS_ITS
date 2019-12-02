import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface ChangedProductPart {
  name: string;
  manager: number;
  descr: string;
}

@Component({
  selector: 'app-update-product-part-dialog',
  templateUrl: './update-product-part-dialog.component.html',
  styleUrls: ['./update-product-part-dialog.component.scss']
})
export class UpdateProductPartDialogComponent implements OnInit {

  public updateProductPartForm: FormGroup;

  constructor(private _http: HttpService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UpdateProductPartDialogComponent>) { }

  ngOnInit() {
    this.updateProductPartForm = new FormGroup({
      name: new FormControl(this.data.productPart.name, [Validators.maxLength(60), Validators.required]),
      description: new FormControl(this.data.productPart.descr, [Validators.required]),
      manager: new FormControl()
    })
  }

  public hasError(controlName: string, errorName: string) {
    return this.updateProductPartForm.controls[controlName].hasError(errorName);
  }

  public updateProductPart(updateProductPartFormValue) {
    if (this.updateProductPartForm.valid) {
      let changedProductPart: ChangedProductPart = {
        name: updateProductPartFormValue.name,
        descr: updateProductPartFormValue.description,
        manager: null
      }

      this._http.updateProductPart(this.data.productPart.product_id, this.data.productPart.id, changedProductPart).subscribe(res => {

      }, error => {
        let errorMessage = JSON.parse(JSON.stringify(error.error));
        alert(errorMessage.error); //TODO
      });

      this.dialogRef.close();
      
    }

  }

}

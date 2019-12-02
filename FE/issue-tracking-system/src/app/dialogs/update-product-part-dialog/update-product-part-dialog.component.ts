import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Manager } from 'src/app/register-new-product/register-new-product.component';

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
  public managers;
  public updateProductPartForm: FormGroup;

  constructor(private _http: HttpService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UpdateProductPartDialogComponent>) { }

  ngOnInit() {
    this.updateProductPartForm = new FormGroup({
      name: new FormControl(this.data.productPart.name, [Validators.maxLength(60), Validators.required]),
      description: new FormControl(this.data.productPart.descr, [Validators.required]),
      manager: new FormControl(this.data.productPart.manager, [Validators.required])
    })

    this.getManagers();
  }

  public hasError(controlName: string, errorName: string) {
    return this.updateProductPartForm.controls[controlName].hasError(errorName);
  }

  public updateProductPart(updateProductPartFormValue) {
    if (this.updateProductPartForm.valid) {
      let changedProductPart: ChangedProductPart = {
        name: updateProductPartFormValue.name,
        descr: updateProductPartFormValue.description,
        manager: updateProductPartFormValue.manager
      }

      this._http.updateProductPart(this.data.productPart.product_id, this.data.productPart.id, changedProductPart).subscribe(res => {

      }, error => {
        let errorMessage = JSON.parse(JSON.stringify(error.error));
        alert(errorMessage.error); //TODO
      });

      this.dialogRef.close();
      
    }
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

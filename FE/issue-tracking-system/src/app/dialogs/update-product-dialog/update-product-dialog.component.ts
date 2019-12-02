import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../../http.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductDetails } from '../../product-details/product-details.component';
import { Manager } from 'src/app/register-new-product/register-new-product.component';

export interface ChangedProduct {
  name: string;
  manager: number;
  descr: string;
}

@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrls: ['./update-product-dialog.component.scss']
})
export class UpdateProductDialogComponent implements OnInit {
  public managers;
  public updateProductForm: FormGroup;

  constructor(private _http: HttpService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UpdateProductDialogComponent>) { }

  ngOnInit() {
    this.updateProductForm = new FormGroup({
      name: new FormControl(this.data.product.name, [Validators.maxLength(60), Validators.required]),
      description: new FormControl(this.data.product.descr, [Validators.required]),
      manager: new FormControl(this.data.product.manager, [Validators.required])
    })

    this.getManagers();
  }

  public hasError(controlName: string, errorName: string) {
    return this.updateProductForm.controls[controlName].hasError(errorName);
  }

  public updateProduct(updateProductFormValue) {
    if (this.updateProductForm.valid) {
      let changedProduct: ChangedProduct = {
        name: updateProductFormValue.name,
        descr: updateProductFormValue.description,
        manager: updateProductFormValue.manager
      }
      
      this._http.updateProduct(this.data.product.id, changedProduct).subscribe(res => {
        
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

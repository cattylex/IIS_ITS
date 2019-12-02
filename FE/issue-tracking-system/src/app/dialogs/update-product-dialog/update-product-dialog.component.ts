import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../../http.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductDetails } from '../../product-details/product-details.component';

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
  public updateProductForm: FormGroup;

  constructor(private _http: HttpService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UpdateProductDialogComponent>) { }

  ngOnInit() {
    this.updateProductForm = new FormGroup({
      name: new FormControl(this.data.product.name, [Validators.maxLength(60), Validators.required]),
      description: new FormControl(this.data.product.descr, [Validators.required]),
      manager: new FormControl()
    })
  }

  public hasError(controlName: string, errorName: string) {
    return this.updateProductForm.controls[controlName].hasError(errorName);
  }

  public updateProduct(updateProductFormValue) {
    if (this.updateProductForm.valid) {
      let changedProduct: ChangedProduct = {
        name: updateProductFormValue.name,
        descr: updateProductFormValue.description,
        manager: null
      }
      
      console.log(changedProduct);

      this._http.updateProduct(this.data.product.id, changedProduct).subscribe(res => {
        
      }, error => {
        let errorMessage = JSON.parse(JSON.stringify(error.error));
        alert(errorMessage.error); //TODO
      });

      this.dialogRef.close();
      
    }

  }

}

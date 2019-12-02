import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { MatDialog } from '@angular/material';
import { ErrorHandlerService } from '../error-handler.service';
import { Location } from '@angular/common';
import { SuccessDialogComponent } from '../create-new-ticket/success-dialog/success-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Manager } from '../register-new-product/register-new-product.component';

export interface ProductPartToCreate {
  name: string;
  manager: number;
  descr: string;
}

@Component({
  selector: 'app-create-product-part',
  templateUrl: './create-product-part.component.html',
  styleUrls: ['./create-product-part.component.scss']
})
export class CreateProductPartComponent implements OnInit {
  public managers;
  public productForm: FormGroup;
  private dialogConfig;

  constructor(private location: Location, private _http: HttpService, private dialog: MatDialog, private errorService:ErrorHandlerService,
              private route: ActivatedRoute) {  }

  ngOnInit() {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      descr: new FormControl('', [Validators.required]),
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

  public onSubmit(productFormValue) {
    if (this.productForm.valid){
      this.createProductPart(productFormValue);
    }
  }

  private createProductPart(productFormValue) {
    let product: ProductPartToCreate = {
      name: productFormValue.name,
      descr: productFormValue.descr,
      manager: productFormValue.manager
    }

    let productId: string = this.route.snapshot.params['id'];

    this._http.createProductPart(productId, product).subscribe(res=> {
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

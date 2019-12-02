import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { HttpService } from 'src/app/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from 'src/app/globals';
import { ProductDetails } from '../product-details.component';
import { UpdateProductPartDialogComponent } from 'src/app/dialogs/update-product-part-dialog/update-product-part-dialog.component';

export interface ProductPart {
  id: number;
  name: string;
  manager: number;
  descr: string;
}

@Component({
  selector: 'app-product-parts',
  templateUrl: './product-parts.component.html',
  styleUrls: ['./product-parts.component.scss']
})
export class ProductPartsComponent implements OnInit {

  public displayedColumns = ['id', 'name', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<ProductPart>();
  
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute, private globals: Globals, private dialog: MatDialog) { }

  ngOnInit() {
    this.getProductParts();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getProductParts() {
    this._http.getProductParts(this.route.snapshot.params['id']).subscribe(res => { 
      this.dataSource.data = res as ProductPart[];
    }, error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    });
  }

  public redirectToDetails(id: number) {
    let productId: string = this.route.snapshot.params['id'];
    let url: string = '/products/' + productId + '/parts/' + id;
    this.router.navigate([url]);
  }
 
  public redirectToUpdate(partId: string) {
    let productId: string = this.route.snapshot.params['id'];

    let productPart: ProductDetails;
    this._http.getProductPartDetails(productId, partId).subscribe(res => {
      productPart = res as ProductDetails;

      let dialogConfig = {
        height: '500px',
        width: '550px',
        disableClose: true,
        data: { productPart }
      }

      let dialogRef = this.dialog.open(UpdateProductPartDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      })
    }, error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    })
    
  }
 
  update(){
    this.ngOnInit();
  }

  public deleteProduct(id: string) {
    let productId: string = this.route.snapshot.params['id'];
    this._http.deleteProductPart(productId, id).subscribe(res => {

    }, error => {
      let errorMessage = JSON.parse(JSON.stringify(error.error));
      alert(errorMessage.error); //TODO
    });
    this.globals.sleep(500);
    this.ngOnInit();
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public createProductPart() {
    let id: string = this.route.snapshot.params['id'];
    this.router.navigate(['/products/' + id + '/create_part']);
  }

  public isMyProduct(author: string): boolean {
    if (this.globals.loggedUser == undefined) return false;
    else {
      if (this.globals.loggedUsername == author) return true;
      else return false;
    }
  }

}

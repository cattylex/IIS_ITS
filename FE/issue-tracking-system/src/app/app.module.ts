import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule, MatIconModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatProgressSpinnerModule, MatInputModule, MatButtonModule, MatOptionModule, MatSelectModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { CreateNewTicketComponent } from './create-new-ticket/create-new-ticket.component';
import { RegisterNewProductComponent } from './register-new-product/register-new-product.component';
import { ErrorDialogComponent } from './create-new-ticket/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from './create-new-ticket/success-dialog/success-dialog.component';
import { CommonModule } from '@angular/common';

 
@NgModule({
  declarations: [
    AppComponent,
    TicketsComponent,
    ProductsComponent,
    ProductDetailsComponent,
    TicketDetailsComponent,
    UserLoginComponent,
    UserSettingsComponent,
    CreateNewTicketComponent,
    RegisterNewProductComponent,
    ErrorDialogComponent,
    SuccessDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    FlexLayoutModule,
    MatDialogModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    SuccessDialogComponent,
    ErrorDialogComponent
  ]
})
export class AppModule { }

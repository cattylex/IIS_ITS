import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule, MatIconModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatProgressSpinnerModule, MatInputModule, MatButtonModule, MatOptionModule, MatSelectModule, MatDialogModule, MatTabsModule, MatSidenavModule, MatSidenavContent, MatListModule, MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';
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
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { Globals } from './globals';
import { TaskDataComponent } from './ticket-details/task-data/task-data.component';
import { TicketDataComponent } from './ticket-details/ticket-data/ticket-data.component';
import { TicketDetailsModule } from './ticket-details/ticket-details.module';
import { ProductDataComponent } from './product-details/product-data/product-data.component';
import { ProductTicketsComponent } from './product-details/product-tickets/product-tickets.component';
import { ProductPartsComponent } from './product-details/product-parts/product-parts.component';
import { ProductPartDetailsComponent } from './product-part-details/product-part-details.component';
import { CreateProductPartComponent } from './create-product-part/create-product-part.component';
import { ProductPartDataComponent } from './product-part-details/product-part-data/product-part-data.component';
import { ProductPartTicketsComponent } from './product-part-details/product-part-tickets/product-part-tickets.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskDetailsDataComponent } from './task-details/task-data/task-data.component';
import { CreateToProductComponent } from './create-new-ticket/create-to-product/create-to-product.component';
import { CreateToProductPartComponent } from './create-new-ticket/create-to-product-part/create-to-product-part.component';
import { UpdateProductDialogComponent } from './dialogs/update-product-dialog/update-product-dialog.component';
import { UpdateProductPartDialogComponent } from './dialogs/update-product-part-dialog/update-product-part-dialog.component';
import { UpdateTaskDialogComponent } from './dialogs/update-task-dialog/update-task-dialog.component';
import { UpdateTicketDialogComponent } from './dialogs/update-ticket-dialog/update-ticket-dialog.component';
import { CreateCommentDialogComponent } from './dialogs/create-comment-dialog/create-comment-dialog.component';
import { UserControlPanelComponent } from './user-control-panel/user-control-panel.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UpdateUserDialogComponent } from './dialogs/update-user-dialog/update-user-dialog.component';
import { UserDataComponent } from './user-details/user-data/user-data.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ReportTimeComponent } from './dialogs/report-time/report-time.component';
 
@NgModule({
  declarations: [
    AppComponent,
    TicketsComponent,
    ProductsComponent,
    ProductDetailsComponent,
    UserLoginComponent,
    UserSettingsComponent,
    CreateNewTicketComponent,
    RegisterNewProductComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,
    LayoutComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    ProductDataComponent,
    ProductTicketsComponent,
    ProductPartsComponent,
    ProductPartDetailsComponent,
    CreateProductPartComponent,
    ProductPartDataComponent,
    ProductPartTicketsComponent,
    CreateTaskComponent,
    TaskDetailsComponent,
    TaskDetailsDataComponent,
    CreateToProductComponent,
    CreateToProductPartComponent,
    UpdateProductDialogComponent,
    UpdateProductPartDialogComponent,
    UpdateTaskDialogComponent,
    UpdateTicketDialogComponent,
    CreateCommentDialogComponent,
    UserControlPanelComponent,
    UserDetailsComponent,
    UpdateUserDialogComponent,
    UserDataComponent,
    CreateUserComponent,
    ReportTimeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
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
    TicketDetailsModule
  ],
  providers: [ Globals ],
  bootstrap: [AppComponent],
  entryComponents: [
    SuccessDialogComponent,
    ErrorDialogComponent,
    UpdateProductDialogComponent,
    UpdateProductPartDialogComponent,
    UpdateTaskDialogComponent,
    UpdateTicketDialogComponent,
    CreateCommentDialogComponent,
    UpdateUserDialogComponent,
    ReportTimeComponent
  ]
})
export class AppModule { }

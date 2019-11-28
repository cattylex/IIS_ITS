import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketDataComponent } from './ticket-data/ticket-data.component';
import { TaskDataComponent } from './task-data/task-data.component';
import { TicketDetailsComponent } from './ticket-details.component';
import { AppModule } from '../app.module';
import { MatMenuModule, MatIconModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTabsModule, MatSidenavModule, MatListModule, MatTableModule, MatSortModule, MatPaginatorModule, MatProgressSpinnerModule, MatOptionModule, MatSelectModule, MatDialogModule, MatCheckboxModule, MatExpansionModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TicketDataComponent,
    TaskDataComponent,
    TicketDetailsComponent
  ],
  imports: [
    CommonModule,
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
    MatCheckboxModule,
    MatPaginatorModule,
    FormsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    FlexLayoutModule,
    MatDialogModule,
    MatExpansionModule,
    RouterModule
  ],
  exports: [
    TicketDataComponent,
    TaskDataComponent,
    TicketDetailsComponent,
    MatExpansionModule
  ]
})
export class TicketDetailsModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';

const routes: Routes = [ 
  { path: 'tickets', component: TicketsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'tickets/:id', component: TicketDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { RegisterNewProductComponent } from './register-new-product/register-new-product.component';
import { CreateNewTicketComponent } from './create-new-ticket/create-new-ticket.component';


const routes: Routes = [ 
  { path: 'login', component: UserLoginComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: 'tickets/:id', component: TicketDetailsComponent },
  { path: 'ticket/create', component: CreateNewTicketComponent},
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'product/register', component: RegisterNewProductComponent},
  { path: 'users/settings', component: UserSettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

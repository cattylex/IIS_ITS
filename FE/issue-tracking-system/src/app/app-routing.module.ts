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
import { HomeComponent } from './home/home.component';
import { CreateProductPartComponent } from './create-product-part/create-product-part.component';
import { ProductPartDetailsComponent } from './product-part-details/product-part-details.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { CreateToProductComponent } from './create-new-ticket/create-to-product/create-to-product.component';
import { CreateToProductPartComponent } from './create-new-ticket/create-to-product-part/create-to-product-part.component';


const routes: Routes = [ 
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: 'tickets/:id', component: TicketDetailsComponent },
  { path: 'ticket/create', component: CreateNewTicketComponent},
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'products/:idP/parts/:idPP', component: ProductPartDetailsComponent },
  { path: 'product/register', component: RegisterNewProductComponent},
  { path: 'user/settings', component: UserSettingsComponent },
  { path: 'products/:id/create_part', component: CreateProductPartComponent},
  { path: 'tickets/:id/tasks/create', component: CreateTaskComponent },
  { path: 'tickets/:idTic/tasks/:idTask', component: TaskDetailsComponent},
  { path: 'products/:id/tickets/create', component: CreateToProductComponent },
  { path: 'products/:idP/parts/:idPP/tickets/create', component: CreateToProductPartComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

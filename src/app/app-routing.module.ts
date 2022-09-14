import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerContainerComponent } from './modules/customers/customer-container.component';

const routes: Routes = [ {
    path: '',
    component: CustomerContainerComponent,
    data: {
      title: 'Customers'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

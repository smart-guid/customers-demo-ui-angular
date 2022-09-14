import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerContainerComponent } from './customer-container.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerContainerComponent,
    data: {
      title: 'Customers'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}

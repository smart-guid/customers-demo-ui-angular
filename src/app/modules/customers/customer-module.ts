import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextComponent } from './components/input-text.component';
import { CustomerFiltersComponent } from './components/customer-filters.component';
import { CustomerListComponent } from './components/customer-list.component';
import { CustomerContainerComponent } from './customer-container.component';
import { CustomerEditorComponent } from './components/customer-editor.component';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  declarations: [
    InputTextComponent,
    CustomerContainerComponent,
    CustomerFiltersComponent,
    CustomerListComponent,
    CustomerEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerRoutingModule,
  ],
})
export class CustomerModule { }

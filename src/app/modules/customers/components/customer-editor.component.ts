import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerModel } from '../models/customer.model';

@Component({
  selector: 'app-customer-editor',
  templateUrl: './customer-editor.component.html'
})
export class CustomerEditorComponent implements OnInit, OnChanges {
  
  @Input('item') item: CustomerModel;    
  @Output('onItemChanged') onItemChanged = new EventEmitter<CustomerModel>();

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {

  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],   
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
  
  }

  public onNameChanged(data: string): void {
    this.item.name = data;
  }

  public onCategoryChanged(data: string): void {
    this.item.category = data; 
  }  

  public saveCustomer():void{
    this.onItemChanged.emit(this.item);
  }
}
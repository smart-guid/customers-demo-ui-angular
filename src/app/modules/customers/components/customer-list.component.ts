import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomerModel } from '../models/customer.model';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit {
    
    @Input('items') items: CustomerModel[] = [];
    @Output('onEdit') onItemEdit = new EventEmitter<CustomerModel>();
    @Output('onDelete') onItemDelete = new EventEmitter<CustomerModel>();    

    constructor() { }

    public ngOnInit(): void {

    }

    public onEdit(customer:CustomerModel):void{   
        this.onItemEdit.emit(customer);
    }

    public onDelete(customer:CustomerModel):void{
        this.onItemDelete.emit(customer);
    }    
}

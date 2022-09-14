import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from '../models/customer.model';

import { EMPTY_ENTITY, Entity, EntityType } from '../models/entity.model';

import { StateObserver, StateService } from './state.service';

@Injectable({ providedIn: 'root' })
export class CustomerService {

    constructor(
        private state: StateService) {

        this.state.registerObserver<Entity<CustomerModel>>(new StateObserver(EntityType.customer_list, EMPTY_ENTITY));
    }

    public loadCustomers(): void {

        //usually a request to an api would be here...

        const customers: CustomerModel[] = [
            { customerID: 1, name: 'Apple', category: 'Phones' },
            { customerID: 2, name: 'Microsoft', category: 'Operating Systems' },
            { customerID: 3, name: 'Amazon', category: 'Literally Anything' },
        ];

        this.state.set<Entity<CustomerModel>>(EntityType.customer_list, { items: customers, selected: null });
    }


    public getCustomers(): Observable<Entity<CustomerModel>> | undefined {
        return this.state.get<Entity<CustomerModel>>(EntityType.customer_list);
    }

    public editCustomer(customer: CustomerModel): void {

        if (!customer) {
            customer = { customerID: 0, name: '', category: '' };
        }

        let customers = this.state.values<Entity<CustomerModel>>(EntityType.customer_list);
        if (customers) {
            customers.selected = { ...customer };
            this.state.set<Entity<CustomerModel>>(EntityType.customer_list, customers);
        }
    }

    public saveCustomer(customer: CustomerModel): void {

        if (!customer) {
            //show some sort of message to user
            return;
        }

        //usually a request to an api would be here...

        let customers = this.state.values<Entity<CustomerModel>>(EntityType.customer_list);
        if (customer.customerID == 0) { //assume this is a new customer
            customer.customerID = customers.items[customers.items.length - 1].customerID + 1;
            customers.items.push(customer);
        }
        else {
            let sourceCustomer = customers.items.find(x => x.customerID == customer.customerID);
            if (sourceCustomer) {
                let idx = customers.items.indexOf(sourceCustomer);
                if (idx >= 0) {
                    customers.items[idx] = customer;
                }
            }
        }
        customers.selected = null;
        this.state.set<Entity<CustomerModel>>(EntityType.customer_list, customers);
    }

    public deleteCustomer(customer: CustomerModel): void {
        //usually a request to an api would be here...

        let customers = this.state.values<Entity<CustomerModel>>(EntityType.customer_list);
        let idx = customers.items.indexOf(customer);
        if (idx > -1) {
           customers.items.splice(idx, 1);
        }
        this.state.set<Entity<CustomerModel>>(EntityType.customer_list, customers);
    }
}
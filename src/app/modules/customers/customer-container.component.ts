import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerModel } from './models/customer.model';
import { EMPTY_ENTITY, Entity } from './models/entity.model';
import { CustomerService } from './services/customer.service';


@Component({
  templateUrl: 'customer-container.component.html'
})
export class CustomerContainerComponent implements OnInit, AfterViewInit, OnDestroy {


  public customers: Entity<CustomerModel> | undefined;

  private subscription$: Subscription[]  = [];


  constructor(
    private service: CustomerService,    
    private router: Router) {

  }


  public ngOnInit(): void {  

    this.service.loadCustomers();

    var o = this.service.getCustomers()?.subscribe(data => {      
      this.customers = data;      
    });
    if (o)this.subscription$.push(o);
  }

  public ngAfterViewInit(): void {  

  }

  public ngOnDestroy(): void {
    this.subscription$.forEach(x =>  { if (x) x.unsubscribe(); });  
    this.subscription$ = [];
  }


  public onCustomerEdit(customer:CustomerModel):void{   
    this.service.editCustomer(customer);       
  }

  public onCustomerDelete(customer:CustomerModel):void{   
   this.service.deleteCustomer(customer); 
  }

  public onCustomerSave(customer:CustomerModel):void{
   this.service.saveCustomer(customer);
  }

}





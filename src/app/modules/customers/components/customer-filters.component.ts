import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-customer-filters',
    templateUrl: './customer-filters.component.html',
})
export class CustomerFiltersComponent implements OnInit {

    @Output('onCreateItem') onCreateItem = new EventEmitter();

    constructor() { }

    public ngOnInit(): void {

    }

    public createCustomer(): void {
        this.onCreateItem.emit();
    }
}

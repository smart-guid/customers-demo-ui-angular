export interface Entity<T>{
    items: T[];
    selected:T;
}

export const EMPTY_ENTITY = {items: [], selected: null};


export const EntityType = {  
    customer_list:'customer_list'
}
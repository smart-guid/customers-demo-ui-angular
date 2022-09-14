import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StateService {

    private eventBus$ = new BehaviorSubject<string>('');

    protected map: IMapArray<any>[] = [];

    constructor() { }

    public getEventBus(): Observable<string> {
        return this.eventBus$.asObservable();
    }

    public emitEvent(eventName: string): void {
        this.eventBus$.next(eventName);
    }

    public registerObserver<T>(observer: StateObserver<T>): void {
        if (this.map.find(x => x.key == observer.name) == null) {
            this.map.push({ key: observer.name, value: observer });
        }
    }

    public get<T>(observerName: string): Observable<T>   | undefined{
        let o = this.resolveObservable<T>(observerName);
        return o ? o.get() : undefined;
    }

    public set<T>(observerName: string, item: T): void {
        let o = this.resolveObservable<T>(observerName);
        if (o) o.set(item);
    }

    public values<T>(observerName: string): T | undefined {
        let o = this.resolveObservable<T>(observerName);
        return o ? o.value() : undefined;
   } 

    private resolveObservable<T>(observerName: string): StateObserver<T>  | undefined{
        let o = this.map.find(x => x.key === observerName);
        return o ? (o.value as StateObserver<T>) : undefined;
    }
}

export class StateObserver<T> {

    private subject$: BehaviorSubject<T>;

    constructor(public name: string, initialState: T) {
        this.subject$ = new BehaviorSubject<T>(initialState);
    }

    public get(): Observable<T> {
        return this.subject$.asObservable();
    }

    public set(item: T): void {
        this.subject$.next(item);
    }

    public value(): T {
        return this.subject$.getValue();
    }  
}




interface IMapArray<T> {
    key: string;
    value: T;
}

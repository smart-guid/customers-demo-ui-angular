import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html'
})
export class InputTextComponent  implements OnInit, OnChanges {

    public focus: boolean = false;
    public dataControl: FormControl;

    @Input('form') formControl: FormGroup;
    @Input('controlName') formControlName: string = null;

    @Input('displayClear') displayClear: boolean = true;

    @Input('autofocus') autofocus: boolean = false;

    @Input('class') cssClass: string = '';    

    @Input('icon') icon: string = '';

    @Input('disabled') disabled: boolean = false;
    @Input('required') required: boolean = true;
    @Input('requiredText') requiredText: string = '';
    @Input('maxLength') maxLength: number = null;
    @Input('placeholderText') placeholderText: string = '';

    @Input('controlWidth') controlWidth: number = 300;

    @Input('type') type: string = 'text';
    @Input('autocomplete') autocomplete: string = null;

    @Input('text') text: string = null;

    @Output('onTextChanged') onTextChanged = new EventEmitter<any>();

    constructor() {

    }

    public ngOnInit(): void {      
        this.dataControl = this.formControl.controls[this.formControlName] as FormControl;
        this.dataControl.valueChanges
            .pipe(debounceTime(10), distinctUntilChanged())
            .subscribe(q => {
                this.onTextChanged.emit(q);
            });
        this.setData();        
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.setData();
    }

    private setData() {
        if (this.dataControl != null) {
            this.dataControl.setValue(this.text);

            if (this.disabled) {
                this.dataControl.disable();
            }
            else {
                this.dataControl.enable();
            }
        }
    }

    public clearCtrl($event) {
        this.text = '';
        this.dataControl.setValue(this.text);

        $event.stopPropagation();
        $event.preventDefault();

        return false;
    }

    public getWidth() {
        return `${this.controlWidth}px !important`;
    }
}

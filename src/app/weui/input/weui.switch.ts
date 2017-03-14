/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, HostBinding, Renderer, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { WeUIFormControl } from './weui.form.control';


const WEUI_FORM_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WeUISwitch),
    multi: true
};

@Component({
    selector: 'weui-switch',
    templateUrl: 'weui.switch.html',
    providers: [WEUI_FORM_CONTROL_VALUE_ACCESSOR]
})
export class WeUISwitch extends WeUIFormControl {

    /** @internal */
    checked = false;

    /**
     * The value of the input ngModel
     *
     * @internal (view -> model)
     */
    set innerValue(checked: boolean) {
        if (this._value !== checked) {
            this._value = checked || false;
            // view -> model -> outside world (ie. NgModel on this control)
            this.onChange(this._value ? this.value : '');
        }
    }

    /**
     * Write a new value to the element.
     *
     * @internal (From ControlValueAccessor interface)
     */
    writeValue(value: any): void {
        this.checked = this.value === value;
        super.writeValue(this.checked);
    }

    /**
     * 扩展样式
     */
    @HostBinding('class') get inputCls(): string {
        return [this.controlClass, 'weui-cell_switch', (this.additionalCls || '')].join(' ');
    }

    constructor(private renderer: Renderer, private elementRef: ElementRef) {
        super(renderer, elementRef);
        this.value = 'on'; // default value
    }

}

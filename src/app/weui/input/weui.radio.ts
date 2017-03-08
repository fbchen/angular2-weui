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
    useExisting: forwardRef(() => WeUIRadio),
    multi: true
};

@Component({
    selector: 'weui-radio',
    providers: [WEUI_FORM_CONTROL_VALUE_ACCESSOR],
    templateUrl: 'weui.radio.html'
})
export class WeUIRadio extends WeUIFormControl {

    /**
     * 扩展样式
     */
    @HostBinding('class') get inputCls(): string {
        return [WeUIFormControl.getBasicControlCls(), 'weui-check__label', (this.additionalCls || '')].join(' ');
    }

    constructor(private renderer: Renderer, private elementRef: ElementRef) {
        super(renderer, elementRef);
    }

}

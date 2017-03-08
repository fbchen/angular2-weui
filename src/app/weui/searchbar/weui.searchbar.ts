/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'weui-searchbar',
    templateUrl: 'weui.searchbar.html'
})
export class WeUISearchBar implements OnInit {

    /**
     * @i18n
     */
    defaults: any = {
        cancelText: '取消',
        searchText: '搜索'
    };

    /**
     * 是否必填
     */
    @Input() required: boolean = true;

    /**
     * @i18n
     * placeholder 规定帮助用户填写输入字段的提示。
     */
    @Input() placeholder: string = this.defaults.searchText;

    /**
     * @i18n 取消
     */
    @Input() cancelText: string = this.defaults.cancelText;

    /**
     * 输入事件
     */
    @Output() search = new EventEmitter<string>();

    // 输入控件
    @ViewChild('searchBox') searchBox: ElementRef;

    public focusing: boolean = false;

    public value: string = '';

    private searchTerms = new Subject<string>();

    constructor() {

    }

    ngOnInit(): void {
        this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .subscribe((term: string) => {
                this.search.emit(term);
            });
    }

    doFocus(): void {
        this.searchBox.nativeElement.focus();
    }

    onFocus(): void {
        this.focusing = true;
    }

    onBlur(): void {
        if (!this.value.length) {
            this.focusing = false;
        }
    }

    onCancel(): void {
        this.value = '';
        this.onBlur();
        this.search.emit('');
    }

    // Push a search term into the observable stream.
    push(term: string): void {
        this.searchTerms.next(term);
    }

    clear(): void {
        this.value = '';
        this.doFocus();
    }

}

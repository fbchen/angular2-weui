/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, HostBinding, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

/**
 * Toast - 弹出式提示
 */
@Component({
    selector: 'weui-toast',
    templateUrl: 'weui.toast.html'
})
export class WeUIToast implements OnChanges {

    /**
     * @i18n
     */
    defaults: any = {
       loadingText: '数据加载中',
       successText: '操作成功'
    };

    /**
     * 内容
     */
    @Input() content: string;

   /**
     * 状态，取值：loading, success
     */
    @Input() status: string;

    /**
     * 状态：正在加载
     */
    @Input() loading = false;

    /**
     * 状态：操作成功
     */
    @Input() success = true;

    /**
     * 样式控制
     */
    @HostBinding('class.weui-hide') get hideCls(): boolean {
        return !this.shown;
    }

    /**
     * 已显示否
     * @internal
     */
    private shown = false;

    constructor() {

    }

    ngOnChanges(changes: SimpleChanges): void {
        const status: SimpleChange = changes['status'];
        if (status) {
            if (status.currentValue === 'loading') {
                this.success = !(this.loading = true);
            }
            if (status.currentValue === 'success') {
                this.loading = !(this.success = true);
            }
        }
    }

    /**
     * 显示
     */
    show(): void {
        this.shown = true;
        if (this.success) {
            setTimeout(() => { this.hide(); }, 2000);
        }
    }

    /**
     * 隐藏
     */
    hide(): void {
        this.shown = false;
    }

}

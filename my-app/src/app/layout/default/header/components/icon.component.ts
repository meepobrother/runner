import { Component } from '@angular/core';

@Component({
    selector: 'header-icon',
    template: `
    <nz-dropdown nzTrigger="click" nzPlacement="bottomRight" (nzVisibleChange)="change()">
        <div class="item" nz-dropdown>
            <i class="anticon anticon-appstore-o"></i>
        </div>
        <div nz-menu class="wd-xl animated jello">
            <nz-spin [nzSpinning]="loading" [nzTip]="'正在读取数据...'">
                <div nz-row [nzType]="'flex'" [nzJustify]="'center'" [nzAlign]="'middle'" class="app-icons">
                    <div nz-col routerLink="/web/site/entry/runner_open/index" [nzSpan]="6">
                        <i class="anticon anticon-calendar bg-error text-white"></i>
                        <small>公众号</small>
                    </div>
                    <div nz-col (click)="goUrl('./index.php?c=wxapp&a=display&')" [nzSpan]="6">
                        <i class="anticon anticon-file bg-teal text-white"></i>
                        <small>小程序</small>
                    </div>
                    <div nz-col (click)="goUrl('./index.php?c=webapp&a=manage&do=list&')" [nzSpan]="6">
                        <i class="anticon anticon-cloud bg-success text-white"></i>
                        <small>PC</small>
                    </div>
                    <div nz-col (click)="goUrl('./index.php?c=module&a=display&')" [nzSpan]="6">
                        <i class="anticon anticon-star-o bg-pink text-white"></i>
                        <small>应用</small>
                    </div>
                    <div nz-col (click)="goUrl('./index.php?c=home&a=welcome&do=system&')" [nzSpan]="6">
                        <i class="anticon anticon-team bg-purple text-white"></i>
                        <small>系统</small>
                    </div>
                    <div nz-col (click)="goUrl('./index.php?c=cloud&a=upgrade&')" [nzSpan]="6">
                        <i class="anticon anticon-scan bg-warning text-white"></i>
                        <small>站点</small>
                    </div>
                    <div nz-col (click)="goUrl('./index.php?c=advertisement&a=content-provider&')" [nzSpan]="6">
                        <i class="anticon anticon-pay-circle-o bg-cyan text-white"></i>
                        <small>广告联盟</small>
                    </div>
                    <div nz-col (click)="goUrl('./index.php?c=help&a=display&')" [nzSpan]="6">
                        <i class="anticon anticon-printer bg-grey text-white"></i>
                        <small>系统帮助</small>
                    </div>
                </div>
            </nz-spin>
        </div>
    </nz-dropdown>
    `
})
export class HeaderIconComponent {

    loading = true;

    change() {
        setTimeout(() => this.loading = false, 500);
    }

}

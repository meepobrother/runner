import { Component } from '@angular/core';
import { MessageService } from '@core/message.service';

@Component({
    selector: 'header-task',
    template: `
    <nz-dropdown nzTrigger="click" nzPlacement="bottomRight" (nzVisibleChange)="change()">
        <div class="item" nz-dropdown>
            <nz-badge [nzDot]="msg.messages.length>0">
                <ng-template #content>
                    <i class="anticon anticon-bell"></i>
                </ng-template>
            </nz-badge>
        </div>
        <div nz-menu class="wd-lg">
            <nz-card nzTitle="未读消息" [nzLoading]="loading" class="ant-card__body-nopadding">
                <ng-template #extra>
                <i class="anticon anticon-plus"></i></ng-template>
                <div *ngFor="let item of msg.messages" nz-row [nzType]="'flex'" [nzJustify]="'center'" [nzAlign]="'middle'" class="py-sm bg-grey-lighter-h point">
                    <div nz-col [nzSpan]="20">
                        <strong>{{item.create_time}}</strong>
                        <p>{{item.message}}</p>
                    </div>
                </div>
                <div nz-row class="pt-lg pb-lg">
                    <div nz-col [nzSpan]="24" class="text-center text-grey point">
                        查看所有
                    </div>
                </div>
            </nz-card>
        </div>
    </nz-dropdown>
    `
})
export class HeaderTaskComponent {

    loading = true;

    constructor(
        public msg: MessageService
    ){}

    change() {
        setTimeout(() => this.loading = false, 500);
    }

}

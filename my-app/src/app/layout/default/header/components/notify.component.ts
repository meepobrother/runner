import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, groupBy, concatMap, mergeMap, flatMap, delay, tap, toArray } from 'rxjs/operators';
import * as moment from 'moment';
import { NoticeItem } from '@delon/abc';
import { SettingsService } from '@delon/theme';
import { MessageService } from '@core/message.service';
/**
 * 菜单通知
 */
@Component({
    selector: 'header-notify',
    template: `
    <notice-icon
        [data]="data"
        [count]="count"
        [loading]="loading"
        (select)="select($event)"
        (clear)="clear($event)"
        (popupVisibleChange)="loadData($event)"></notice-icon>
    `
})
export class HeaderNotifyComponent implements OnInit {

    data: NoticeItem[] = [
        { title: '通知', list: [], emptyText: '你已查看所有通知', emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg' },
        { title: '消息', list: [], emptyText: '您已读完所有消息', emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg' },
        { title: '待办', list: [], emptyText: '你已完成所有待办', emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg' }
    ];
    count = 0;
    loading = false;

    constructor(
        private msg: NzMessageService, 
        private settings: SettingsService,
        private message: MessageService
    ) {}

    ngOnInit() {
        // mock data
        this.count = this.settings.user.notifyCount || 0;
    }

    private parseGroup(data: Observable<any[]>) {
        console.log('parseGroup');
        data.pipe(
                concatMap((i: any) => i),
                map((i: any) => {
                    if (i.datetime) i.datetime = moment(i.datetime).fromNow();
                    // change to color
                    if (i.status) {
                        i.color = ({
                            todo: '',
                            processing: 'blue',
                            urgent: 'red',
                            doing: 'gold',
                        })[i.status];
                    }
                    return i;
                }),
                groupBy((x: any) => x.type),
                mergeMap(g => g.pipe(toArray())),
                tap((ls: any) => {
                    this.data.find(w => w.title === ls[0].type).list = ls;
                })
            ).subscribe(res => this.loading = false);
    }

    loadData(res) {
        if (!res || this.loading) return;
        this.loading = true;
        this.parseGroup(ArrayObservable.of([]).pipe(delay(1000)));
    }

    clear(type: string) {
        this.msg.success(`清空了 ${type}`);
    }

    select(res: any) {
        this.msg.success(`点击了 ${res.title} 的 ${res.item.title}`);
    }
}

import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AccountsService {
    accounts: any[] = [];
    account: any;
    levels: any[] = [
        '普通订阅号', '普通服务号', '认证订阅号', '认证服务号/认证媒体/政府订阅号'
    ];
    constructor(
        private injector: Injector
    ) { 
        this.account = JSON.parse(localStorage.getItem('_account'));
    }

    set(accounts: any[]) {
        this.accounts = accounts;
    }

    get() {
        return this.accounts;
    }

    getLevel(i: number) {
        return this.levels[i - 1];
    }

    getDesc(item: any) {
        return `类型：${this.getLevel(item.level) || '未知'}`;
    }

    switchAccount(item: any) {
        localStorage.setItem('_uniacid', item.uniacid);
        localStorage.setItem('_account', JSON.stringify(item));
        this.account = item;
        setTimeout(() => {
            this.injector.get(Router).navigate(['/web/site/entry/runner_open/welcome']);
        }, 0);
    }
}

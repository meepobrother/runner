import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class MessageService {
    messages: any[] = [];
    msgTypes: any[] = [
        '到期消息',
        '注册提醒',
        '工单提醒'
    ];
    constructor(
        private injector: Injector
    ) {
    }

    set(accounts: any[]) {
        this.messages = accounts;
    }

    get() {
        return this.messages;
    }
}

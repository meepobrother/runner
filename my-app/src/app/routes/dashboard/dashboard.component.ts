import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { UtilService } from '@core/util.service';
import { AccountsService } from '@core/accounts.service';
import { NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./style.css']
})
export class DashboardComponent implements OnInit {
    loading: boolean = false;
    columns: any[] = [
        { title: '编号', index: 'uniacid' },
        { title: '公众号', index: 'name' },
        { title: '类型', index: 'level' },
        {
            title: '操作', buttons: [
                {
                    text: '切换',
                    click: (record: any) => {
                        this.accounts.switchAccount(record);
                    }
                },
            ]
        },
    ];
    constructor(
        private http: _HttpClient,
        public util: UtilService,
        public accounts: AccountsService,
        public msg: NzMessageService
    ) { }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.loading = false;

    }

}

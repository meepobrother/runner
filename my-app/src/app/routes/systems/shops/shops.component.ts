import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
})
export class ShopsComponent implements OnInit {
    users: any[] = [];
    columns: SimpleTableColumn[] = [
        { title: '编号', index: 'id' }
    ];
    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }

}

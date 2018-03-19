import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SimpleTableColumn, SimpleTableChange, SimpleTableFilter } from '@delon/abc';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
})
export class WebOpenComponent implements OnInit {
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

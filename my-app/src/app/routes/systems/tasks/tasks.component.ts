import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SimpleTableColumn, SimpleTableChange, SimpleTableFilter } from '@delon/abc';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
})
export class TasksComponent implements OnInit {
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

import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-setting-system',
    templateUrl: './setting-system.component.html',
    styleUrls: ['./style.css']
})
export class SettingSystemComponent implements OnInit {
    systemForm: FormGroup;
    constructor(
        private http: _HttpClient,
        private fb: FormBuilder
    ) {
        this.systemForm = fb.group({
            title: ['', Validators.compose([Validators.required])],
            desc: ['', Validators.minLength(160)],
            icon: [''],
            company: [''],
            url: [''],
            location: ['']
        });
    }

    ngOnInit() {
        this.systemForm.patchValue({
            title: '跑腿开放平台',
            desc: '为第三方应用或商户介入跑腿而生！',
            icon: '',
            company: '杭州米波网络科技',
            url: 'http://meepo.com.cn',
            location: '浙江省杭州市'
        });
    }

    profileSave(event, value) {
        console.log('profile value', value);
    }

}

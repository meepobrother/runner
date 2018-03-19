import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
})
export class SettingComponent implements OnInit {

    active = 1;
    profileForm: FormGroup;
    systemForm: FormGroup;
    
    pwd = {
        old_password: '',
        new_password: '',
        confirm_new_password: ''
    };
    // Email
    primary_email = 'cipchk@qq.com';

    constructor(fb: FormBuilder, public msg: NzMessageService) {
        this.profileForm = fb.group({
            name: [null, Validators.compose([Validators.required, Validators.pattern(`^[-_a-zA-Z0-9]{4,20}$`)])],
            email: '',
            bio: [null, Validators.maxLength(160)],
            url: '',
            company: '',
            location: ''
        });

        this.systemForm = fb.group({
            title: [null, Validators.compose([Validators.required])],
            desc: '',
            icon: '',
            company: '',
            url: '',
            location: ''
        });
    }

    get name() { return this.profileForm.get('name'); }

    profileSave(event, value) {
        console.log('profile value', value);
    }

    pwdSave() {
        if (!this.pwd.old_password) {
            return this.msg.error('invalid old password');
        }
        if (!this.pwd.new_password) {
            return this.msg.error('invalid new password');
        }
        if (!this.pwd.confirm_new_password) {
            return this.msg.error('invalid confirm new password');
        }
        console.log('pwd value', this.pwd);
    }

    ngOnInit() {
        this.profileForm.patchValue({
            name: 'cipchk',
            email: 'cipchk@qq.com'
        });
    }

}

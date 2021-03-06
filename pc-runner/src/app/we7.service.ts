import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { environment } from '../environments/environment';
@Injectable()
export class We7Service {
    queryParams: any = {};

    address: any;
    lat: any;
    lng: any;

    locChange: Subject<any> = new Subject();
    constructor(
        public router: Router,
    ) {
        this.parseUrl();
    }

    parseUrl() {
        let tree = this.router.parseUrl(location.search);
        this.queryParams = tree.queryParams;
    }

    get(name: string) {
        this.parseUrl();
        return this.queryParams[name];
    }

    getCloudSetting() {

    }

    getUrl(_do: string, _params: any = {}) {
        this.parseUrl();
        this.queryParams['do'] = _do;
        this.queryParams = { ...this.queryParams, ..._params };
        let url = this.serializeQueryParams(this.queryParams);
        return url;
    }

    getMobileUrl(_do: string, _params: any = {}) {
        _params['c'] = 'entry';
        _params['a'] = 'site';
        _params['i'] = this.get('i') ? this.get('i') : '2';
        return '/app/index.php' + this.getUrl(_do, _params);
    }

    getWebUrl(_do: string, _params: any = {}) {
        _params['c'] = 'site';
        _params['a'] = 'entry';
        return '/web/index.php' + this.getUrl(_do, _params);
    }

    getWebAppUrl(_do: string, _params: any = {}) {
        _params['c'] = 'entry';
        _params['a'] = 'webapp';
        return '/app/index.php' + this.getUrl(_do, _params);
    }

    getApiUrl(_do: string, _params: any = {}) {

    }

    getSystemUrl(_do: string, _params: any = {}) {
        _params['a'] = environment.a;
        _params['c'] = environment.c;
        return `/${environment.path}/index.php${this.getUrl(_do, _params)}`;
    }

    serializeQueryParams(params: { [key: string]: any }): string {
        const strParams: string[] = Object.keys(params).map((name) => {
            const value = params[name];
            return Array.isArray(value) ?
                value.map(v => `${this.encodeUriQuery(name)}=${this.encodeUriQuery(v)}`).join('&') :
                `${this.encodeUriQuery(name)}=${this.encodeUriQuery(value)}`;
        });
        return strParams.length ? `?${strParams.join("&")}` : '';
    }

    encodeUriQuery(s: string): string {
        return this.encodeUriString(s).replace(/%3B/gi, ';');
    }

    encodeUriString(s: string): string {
        return encodeURIComponent(s)
            .replace(/%40/g, '@')
            .replace(/%3A/gi, ':')
            .replace(/%24/g, '$')
            .replace(/%2C/gi, ',');
    }

    autoLogin() { }

    loginSuccess(info: any) {
        const _do = localStorage.getItem('login.success');
        sessionStorage.setItem('uid', info.id);
        if (_do) {
            this.router.navigate([`/${_do}`], { queryParams: { uid: info.id } });
        } else {
            this.router.navigate(['/index'], { queryParams: { uid: info.id } });
        }
    }

    guid() {
        return 'PTxxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    tip(msg: string) { }

    toRegister() {
        this.router.navigate(['/register']);
    }

    toForget() {
        this.router.navigate(['/forget']);
    }

    toLogin() {
        this.router.navigate(['/login']);
    }

    go(item: any) {
        if (typeof item === 'string') {
            location.href = item;
            return;
        }
        const { link } = item;
        if (!link.m || link.m === 'shibida_mfans') {
            this.router.navigate(['/', link.do])
        } else {
            location.href = this.getMobileUrl(link.do, { m: link.m });
        }
    }
}
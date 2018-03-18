import { Injectable, InjectionToken, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
export const ENVIRONMENT = new InjectionToken('ENVIRONMENT');

@Injectable()
export class UtilService {
  queryParams: any = {};

  address: any;
  lat: any;
  lng: any;

  locChange: Subject<any> = new Subject();

  environment: any;
  constructor(
    public injector: Injector
  ) {
    this.queryParams = this.parseURL();
    this.environment = this.injector.get(ENVIRONMENT);
  }

  parseURL(): { [k: string]: string } {
    const ret = {};
    const seg = location.search.replace(/^\?/, '').split('&').filter(function (v, i) {
      if (v !== '' && v.indexOf('=')) {
        return true;
      }
    });
    seg.forEach((element, index) => {
      const idx = element.indexOf('=');
      const key = element.substring(0, idx);
      const val = element.substring(idx + 1);
      ret[key] = val;
    });
    return ret;
  }

  get(name: string) {
    return this.queryParams[name];
  }

  getUrl(_do: string, _params: any = {}) {
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
    _params['a'] = this.environment.a;
    _params['c'] = this.environment.c;
    return `/${this.environment.path}/index.php${this.getUrl(_do, _params)}`;
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

  guid() {
    return 'PTxxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
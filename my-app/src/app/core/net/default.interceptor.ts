import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse,
    HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { mergeMap, catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { TokenService } from '@delon/auth';

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {

    }

    get msg(): NzMessageService {
        return this.injector.get(NzMessageService);
    }

    private goTo(url: string) {
        setTimeout(() => this.injector.get(Router).navigate([url]));
    }

    private handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
        // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
        this.injector.get(_HttpClient).end();
        // 业务处理：一些通用操作
        if (event instanceof HttpErrorResponse) {
            this.goTo('/web/site/entry/runner_open/login');
            return of(event);
        }
        switch (event.status) {
            case 200:
                // 业务层级错误处理，以下假如响应体的 `status` 若不为 `0` 表示业务级异常
                // 并显示 `error_message` 内容
                // const body: any = event instanceof HttpResponse && event.body;
                // if (body && body.status !== 0) {
                //     this.msg.error(body.error_message);
                //     return ErrorObservable.throw(event);
                // }
                break;
            case 401: // 未登录状态码
                this.goTo('/web/site/entry/runner_open/login');
                break;
            case 403:
            case 404:
            case 302:
                this.goTo('/web/site/entry/runner_open/login');
                break;
            case 500:
                this.goTo(`//web/site/entry/runner_open/${event.status}`);
                break;
        }
        return of(event);
    }
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        const url = req.url;
        const _token = localStorage.getItem('_token');
        let newReq;
        if (_token) {
            const data = JSON.parse(_token);
            newReq = req.clone({
                url: url,
                setHeaders: {
                    token: data ? data.token : ''
                }
            });
        } else {
            newReq = req.clone({
                url: url
            });
        }

        return next.handle(newReq).pipe(
            mergeMap((event: any) => {
                if (event instanceof HttpResponse && event.status === 200)
                    return this.handleData(event);
                return of(event);
            }),
            catchError((err: HttpErrorResponse) => this.handleData(err))
        );
    }
}

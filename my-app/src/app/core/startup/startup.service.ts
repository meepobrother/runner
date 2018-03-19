import { Router } from '@angular/router';
import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs/observable/zip';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { UtilService } from '../util.service';
import { AccountsService } from '../accounts.service';
import { MessageService } from '../message.service';



export interface AppConfigInterface {
    app: {
        name: string;
        description: string;
    };
    user: {
        name: string,
        avatar: string,
        email: string,
        token: string
    };
    menu: {
        text: string;
        translate: string;
        group: boolean;
        children: any[];
        link: string;
        icon: string;
        acl: string;
    }[];
}
/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
    constructor(
        private menuService: MenuService,
        private settingService: SettingsService,
        private aclService: ACLService,
        private titleService: TitleService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private httpClient: HttpClient,
        private injector: Injector,
        private util: UtilService,
        private accounts: AccountsService,
        private message: MessageService
    ) { }

    private viaHttp(resolve: any, reject: any) {
        const tokenData = this.tokenService.get();
        if (!tokenData.token) {
            this.injector.get(Router).navigate(['web/site/entry/runner_open/login']);
            resolve({});
            return;
        }
        const url = this.util.getWebUrl('open', { open: 'we7/startup' });
        zip(
            this.httpClient.get(url)
        ).pipe(
            // 接收其他拦截器后产生的异常消息
            catchError(([appData]) => {
                resolve(null);
                return [appData];
            })
        ).subscribe(([appData]) => {
            // application data
            const res: any = appData;
            // 应用信息：包括站点名、描述、年份
            this.settingService.setApp(res.app || {
                name: `ng-alain`,
                description: `Ng-zorro admin panel front-end framework`
            });
            this.accounts.set(res.accounts);
            this.message.set(res.messages);
            // ACL：设置权限为全量
            this.aclService.setFull(res.isfounder);
            // 初始化菜单
            this.menuService.add(res.menu || []);
            // 设置页面标题的后缀
            this.titleService.suffix = res.app ? res.app.name : '';
        },
            () => {
                console.log('error');
            },
            () => {
                console.log('complement');
                resolve(null);
            });
    }

    private viaMock(resolve: any, reject: any) {
        const app: any = {
            name: `ng-alain`,
            description: `Ng-zorro admin panel front-end framework`
        };
        const user: any = {
            name: 'Admin',
            avatar: './assets/img/zorro.svg',
            email: 'cipchk@qq.com',
            token: '123456789'
        };
        // 应用信息：包括站点名、描述、年份
        this.settingService.setApp(app);
        // 用户信息：包括姓名、头像、邮箱地址
        this.settingService.setUser(user);
        // ACL：设置权限为全量
        this.aclService.setFull(true);
        // 初始化菜单
        this.menuService.add([
            {
                text: '主导航',
                group: true,
                children: [
                    {
                        text: '仪表盘',
                        link: '/dashboard',
                        icon: 'icon-speedometer'
                    },
                    {
                        text: '快捷菜单',
                        icon: 'icon-rocket',
                        shortcut_root: true
                    }
                ]
            }
        ]);
        // 设置页面标题的后缀
        this.titleService.suffix = app.name;
        resolve({});
    }

    load(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.viaHttp(resolve, reject);
        });
    }
}

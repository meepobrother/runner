import { Component, ViewChild } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { AccountsService } from '@core/accounts.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    searchToggleStatus: boolean;

    constructor(
        public settings: SettingsService,
        public accounts: AccountsService
    ) { }

    toggleCollapsedSideabar() {
        this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
    }

    searchToggleChange() {
        this.searchToggleStatus = !this.searchToggleStatus;
    }

}

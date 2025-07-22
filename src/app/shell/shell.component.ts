import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import * as nav from './navigation';
import { LanguageSelectorComponent } from '@app/i18n/language-selector.component';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, MaterialModule, RouterModule, LanguageSelectorComponent],
})
export class ShellComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatDrawer;
  menus: any[] = [];
  protected keycloak = inject(Keycloak);
  constructor(
    private titleService: Title,
    private breakpoint: BreakpointObserver,
  ) {}

  ngOnInit() {
    this.menus = nav.menuItems;

    console.log(this.keycloak.profile);
    this.keycloak.loadUserInfo().then(userInfo => {
      console.log('User Info:', userInfo);
    });
  }

  logout() {
    this.keycloak.logout({
      redirectUri: window.location.origin
    }).then(() => {});
  }

  login() {
    this.keycloak.login({
      redirectUri: window.location.origin
    }).then(() => {});
  }

  toggleSidenav() {
    if (this.sidenav && this.isAuthenticated) {
      this.sidenav.toggle();
    }
  }

  closeSidenavOnMobile() {
    if (this.isMobile && this.sidenav && this.isAuthenticated) {
      this.sidenav.close();
    }
  }

  get username(): string | null {
    return null;
  }

  get isMobile(): boolean {
    return this.breakpoint.isMatched(Breakpoints.Small) || this.breakpoint.isMatched(Breakpoints.XSmall);
  }

  get isAuthenticated(): boolean {
    return this.keycloak.authenticated || false;
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}

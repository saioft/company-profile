import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PRODUCT_LINES, SERVICES } from 'src/app/data/product/product.data';
import { environment } from 'src/environments/environment';
import { environmentCommon } from 'src/environments/environment-common';
import { BRAND } from '../../../data/brand/brand.data';
import { DarkLightSettings, URLS } from '../../../data/constant';
import { ProductLine } from '../../../model/product/product.model';
import { ThemeService } from '../../../service/theme/theme.service';

@Component( {
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [ './footer.component.scss' ]
} )
export class FooterComponent {

  @Input()
  hideShadow = false;
  @Input()
  popupPadding = false;

  PRODUCT_LINES: ProductLine[] = PRODUCT_LINES;
  SERVICES: ProductLine[] = SERVICES;
  BRAND = BRAND;
  URLS = URLS;

  POWERED_BY_LIGHT = 'https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/badge/powered-by-light-mode.min.png';
  POWERED_BY_DARK = 'https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/badge/powered-by-dark-mode.min.png';

  appVersion = '1.0.0';
  poweredBy: string;

  environment = environment;
  environmentCommon = environmentCommon;

  constructor(
      private router: Router,
      private themeService: ThemeService
  ) {
    this.appVersion = themeService.appVersion;
    this.themeService.darkLightSetting.subscribe( darkLightSetting => {
      this.poweredBy = this.getSrcWithDarkLightSetting( darkLightSetting, this.POWERED_BY_LIGHT, this.POWERED_BY_DARK );
    } );
  }

  getCurrentRoute() {
    return this.router.url;
  }

  getSrcWithDarkLightSetting( darkLightSetting: string, light: string, dark: string ) {
    switch ( darkLightSetting ) {
      case DarkLightSettings.light: { return light; }
      case DarkLightSettings.dark: { return dark; }
      case DarkLightSettings.auto:
      default: {
        window.matchMedia( '(prefers-color-scheme: dark)' ).addEventListener( 'change', () => {
          this.poweredBy = this.themeService.selectDarkLightByCSS( light, dark );
        } );
        return this.themeService.selectDarkLightByCSS( light, dark );
      }
    }
  }
}

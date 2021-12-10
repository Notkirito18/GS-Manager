import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class CustomIconsService {
  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {
    this.matIconRegistry.addSvgIcon(
      `shirt`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/shirt.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `sweat`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/hoody.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `mug`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/mug.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `wallet`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/wallet.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `financing`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/financing.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `merchandise`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/merchandise.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `payment`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/payment.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `restock`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/restock.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `other`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/other.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `edit`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/edit.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `gslogo`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/gslogo.svg')
    );
  }
}

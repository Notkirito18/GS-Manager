import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'gs-manager';
  mediaSubscription!: Subscription;
  screenSize = 'lg';
  constructor(
    private mediaObserver: MediaObserver,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {
    // custom icons
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
  }
  ngOnInit(): void {
    this.mediaSubscription = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        this.screenSize = result.mqAlias;
      }
    );
  }
}

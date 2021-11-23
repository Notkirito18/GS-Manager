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
      `hoody`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/hoody.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `mug`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/mug.svg')
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

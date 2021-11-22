import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StockComponent } from './Pages/Admin pages/stock/stock.component';
import { OrderComponent } from './Pages/Admin pages/order/order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './Pages/Admin pages/dashboard/dashboard.component';
import { WalletComponent } from './Pages/Admin pages/wallet/wallet.component';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { ProductsPageComponent } from './Pages/products-page/products-page.component';
import { CustomPageComponent } from './Pages/custom-page/custom-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StockServiceService } from './shared/services/stock-service.service';
import { reducer as productsReducer } from './store/stock/stock.reducer';
import { reducer as ordersReducer } from './store/orders/order.reducer';
import { StockEffects } from './store/stock/stock.effects';
import { OrderEffects } from './store/orders/order.effects';

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    OrderComponent,
    HeaderComponent,
    DashboardComponent,
    WalletComponent,
    LandingPageComponent,
    ProductsPageComponent,
    CustomPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      products: productsReducer,
      orders: ordersReducer,
    }),
    EffectsModule.forRoot([StockEffects, OrderEffects]),

    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

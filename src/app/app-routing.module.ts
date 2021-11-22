import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Pages/Admin pages/dashboard/dashboard.component';
import { OrderComponent } from './Pages/Admin pages/order/order.component';
import { StockComponent } from './Pages/Admin pages/stock/stock.component';
import { WalletComponent } from './Pages/Admin pages/wallet/wallet.component';
import { CustomPageComponent } from './Pages/custom-page/custom-page.component';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { ProductsPageComponent } from './Pages/products-page/products-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        redirectTo: 'stock',
        pathMatch: 'full',
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'stock', component: StockComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'wallet', component: WalletComponent },
    ],
  },
  { path: 'home', component: LandingPageComponent },
  { path: 'products/:type', component: ProductsPageComponent },
  { path: 'custom', component: CustomPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

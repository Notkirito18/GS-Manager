import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  dateBeautifier,
  getCount,
  productTypeBeautifier,
} from 'src/app/shared/helper';
import { Order, Product, Record } from 'src/app/shared/models';
import { loadOrders } from 'src/app/store/orders/order.actions';
import { selectAllOrders } from 'src/app/store/orders/order.selectors';
import { loadProducts } from 'src/app/store/stock/stock.actions';
import { selectAllProducts } from 'src/app/store/stock/stock.selectors';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexResponsive,
  ApexTheme,
  ApexDataLabels,
  ApexGrid,
  ApexLegend,
  ApexPlotOptions,
  ApexYAxis,
} from 'ng-apexcharts';
import { Breakpoints } from '@angular/cdk/layout';
import { selectBalance } from 'src/app/store/records/record.selectors';
import { loadBalance } from 'src/app/store/records/record.actions';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  resposive: ApexResponsive;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor(
    private productsStore: Store<{ products: Product[] }>,
    private ordersStore: Store<{ orders: Order[] }>,
    private recordsStore: Store<{ records: Record[] }>
  ) {
    this.chartOptions = {
      series: [
        {
          name: 'My-series',
          data: [13, 12, 8, 11, 5, 9, 12, 17, 14, 15, 17, 4],
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      title: {
        text: 'Sales (2021)',
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      colors: [
        '#008FFB',
        '#00E396',
        '#FEB019',
        '#FF4560',
        '#775DD0',
        '#546E7A',
        '#26a69a',
        '#D10CE8',
        '#D10CE8',
        '#D10CE8',
        '#D10CE8',
        '#D10CE8',
      ],
    };
  }

  stock: Product[] = [];
  activeOrders: Order[] = [];
  stockRef$!: Subscription;
  balance!: number;
  ngOnInit(): void {
    this.productsStore.dispatch(loadProducts());
    this.ordersStore.dispatch(loadOrders());
    this.ordersStore.dispatch(loadBalance());
    this.stockRef$ = this.productsStore
      .select(selectAllProducts)
      .subscribe((products) => {
        this.stock = products;
      });
    this.ordersStore.select(selectAllOrders).subscribe((orders) => {
      this.activeOrders = orders.filter((item) => {
        return item.status !== 'delivered';
      });
    });
    //
    this.recordsStore.select(selectBalance).subscribe((balance) => {
      this.balance = balance;
    });
  }
  ngOnDestroy(): void {
    this.stockRef$.unsubscribe();
  }

  getCount = getCount;
  productTypeBeautifier = productTypeBeautifier;
  dateBeautifier = dateBeautifier;
}
